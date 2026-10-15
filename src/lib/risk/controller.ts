import { evidenceLedger } from '../evidence/ledger';
import { generateCorrelationId } from '../crypto';

export type RiskLevel = 'NORMAL' | 'CAUTION' | 'BLOCKED' | 'PAUSED' | 'OWNER_ACTION_REQUIRED';

export interface RiskSignal {
  id: string;
  source: 'ORACLE' | 'SIMULATION' | 'RPC' | 'MANDATE' | 'VELOCITY';
  level: RiskLevel;
  metric: string;
  value: string;
  threshold: string;
  message: string;
  timestamp: string;
}

class RiskControllerService {
  private currentLevel: RiskLevel = 'NORMAL';
  private signals: RiskSignal[] = [];

  constructor() {
    this.signals.push({
      id: 'sig-init',
      source: 'ORACLE',
      level: 'NORMAL',
      metric: 'Price Freshness',
      value: '12s ago',
      threshold: '< 300s',
      message: 'All oracle and market feeds operating normally.',
      timestamp: new Date().toISOString(),
    });
  }

  public getRiskLevel(): RiskLevel {
    return this.currentLevel;
  }

  public getSignals(): RiskSignal[] {
    return [...this.signals];
  }

  public canExecute(): { allowed: boolean; reason?: string } {
    if (this.currentLevel === 'PAUSED') {
      return { allowed: false, reason: 'Risk Controller: System is PAUSED due to emergency trigger.' };
    }
    if (this.currentLevel === 'BLOCKED') {
      return { allowed: false, reason: 'Risk Controller: New transactions are BLOCKED due to elevated risk.' };
    }
    if (this.currentLevel === 'OWNER_ACTION_REQUIRED') {
      return { allowed: false, reason: 'Risk Controller: Explicit owner intervention required before resuming.' };
    }
    return { allowed: true };
  }

  public triggerSignal(
    source: RiskSignal['source'],
    level: RiskLevel,
    metric: string,
    value: string,
    threshold: string,
    message: string
  ): RiskSignal {
    const signal: RiskSignal = {
      id: `sig-${Date.now()}`,
      source,
      level,
      metric,
      value,
      threshold,
      message,
      timestamp: new Date().toISOString(),
    };

    this.signals.unshift(signal);

    // Escalate risk level if signal is higher severity
    if (level === 'PAUSED' || level === 'BLOCKED' || level === 'OWNER_ACTION_REQUIRED') {
      this.currentLevel = level;
      evidenceLedger.appendEvent(
        'RISK_TRIGGER_ACTIVATED',
        'SECURITY_SENTINEL',
        generateCorrelationId(),
        {
          signalSource: source,
          metric,
          value,
          newRiskLevel: level,
          message,
        },
        'WARNING'
      );
    } else if (level === 'CAUTION' && this.currentLevel === 'NORMAL') {
      this.currentLevel = 'CAUTION';
    }

    return signal;
  }

  public emergencyPause(reason: string) {
    this.currentLevel = 'PAUSED';
    evidenceLedger.appendEvent(
      'RISK_TRIGGER_ACTIVATED',
      'SECURITY_SENTINEL',
      generateCorrelationId(),
      { action: 'EMERGENCY_PAUSE', reason },
      'WARNING'
    );
  }

  public resetToNormal(ownerSig?: string) {
    this.currentLevel = 'NORMAL';
    evidenceLedger.appendEvent(
      'RISK_TRIGGER_ACTIVATED',
      'USER',
      generateCorrelationId(),
      { action: 'RISK_RESET_TO_NORMAL', ownerSig: ownerSig || 'OWNER_OVERRIDE' },
      'SUCCESS'
    );
  }
}

export const riskController = new RiskControllerService();
