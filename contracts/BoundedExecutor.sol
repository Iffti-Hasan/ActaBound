// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

/**
 * @title BoundedExecutor
 * @notice Mandate-governed smart contract vault for autonomous AI agents.
 * @dev Enforces deterministic spending caps, protected reserves, and allowlists directly on-chain.
 */
contract BoundedExecutor {
    address public owner;
    address public agent;
    bool public paused;
    bool public revoked;

    uint256 public dailySpendingLimit;
    uint256 public currentDailySpent;
    uint256 public lastDayResetTimestamp;
    uint256 public maxTransactionLimit;
    uint256 public protectedReserve;

    mapping(address => bool) public allowedTokens;
    mapping(address => bool) public allowedDestinations;
    mapping(bytes32 => bool) public executedFingerprints;

    event MandateConfigured(address indexed owner, address indexed agent, uint256 dailyLimit, uint256 maxTx, uint256 reserve);
    event TransactionExecuted(bytes32 indexed fingerprint, address indexed token, address indexed to, uint256 amount);
    event EmergencyPaused(address indexed by);
    event EmergencyResumed(address indexed by);
    event MandateRevoked(address indexed by);

    error Unauthorized();
    error ContractPaused();
    error ContractRevoked();
    error TokenNotAllowed();
    error DestinationNotAllowed();
    error ExceedsTransactionLimit();
    error ExceedsDailyBudget();
    error ReserveBreach();
    error ReplayDetected();

    modifier onlyOwner() {
        if (msg.sender != owner) revert Unauthorized();
        _;
    }

    modifier onlyAgent() {
        if (msg.sender != agent && msg.sender != owner) revert Unauthorized();
        _;
    }

    modifier whenNotPaused() {
        if (paused) revert ContractPaused();
        if (revoked) revert ContractRevoked();
        _;
    }

    constructor(
        address _agent,
        uint256 _dailyLimit,
        uint256 _maxTx,
        uint256 _reserve
    ) {
        owner = msg.sender;
        agent = _agent;
        dailySpendingLimit = _dailyLimit;
        maxTransactionLimit = _maxTx;
        protectedReserve = _reserve;
        lastDayResetTimestamp = block.timestamp;

        emit MandateConfigured(owner, _agent, _dailyLimit, _maxTx, _reserve);
    }

    function setTokenAllowlist(address token, bool allowed) external onlyOwner {
        allowedTokens[token] = allowed;
    }

    function setDestinationAllowlist(address destination, bool allowed) external onlyOwner {
        allowedDestinations[destination] = allowed;
    }

    function pause() external onlyOwner {
        paused = true;
        emit EmergencyPaused(msg.sender);
    }

    function unpause() external onlyOwner {
        paused = false;
        emit EmergencyResumed(msg.sender);
    }

    function revoke() external onlyOwner {
        revoked = true;
        emit MandateRevoked(msg.sender);
    }

    /**
     * @notice Autonomously executes a transfer bounded by on-chain mandate rules.
     */
    function executeTransfer(
        bytes32 fingerprint,
        address token,
        address recipient,
        uint256 amount
    ) external onlyAgent whenNotPaused returns (bool) {
        if (!allowedTokens[token]) revert TokenNotAllowed();
        if (!allowedDestinations[recipient]) revert DestinationNotAllowed();
        if (amount > maxTransactionLimit) revert ExceedsTransactionLimit();
        if (executedFingerprints[fingerprint]) revert ReplayDetected();

        // 24-hour daily budget reset check
        if (block.timestamp >= lastDayResetTimestamp + 1 days) {
            currentDailySpent = 0;
            lastDayResetTimestamp = block.timestamp;
        }

        if (currentDailySpent + amount > dailySpendingLimit) revert ExceedsDailyBudget();

        // Reserve check
        uint256 balance = IERC20(token).balanceOf(address(this));
        if (balance < amount || (balance - amount) < protectedReserve) revert ReserveBreach();

        // State update
        currentDailySpent += amount;
        executedFingerprints[fingerprint] = true;

        // Execution
        bool success = IERC20(token).transfer(recipient, amount);
        require(success, "Token transfer failed");

        emit TransactionExecuted(fingerprint, token, recipient, amount);
        return true;
    }
}
