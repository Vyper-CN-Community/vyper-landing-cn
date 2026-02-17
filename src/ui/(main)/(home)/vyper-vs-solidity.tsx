import { CodeHighlight } from '@/ui/components/shared/code-highlight'
import { VyperVsSolidityClient } from './vyper-vs-solidity-client'

const vyperCode = `
@external
def purchase():
    assert msg.value == 2 * self.value
    assert self.state == State.LOCKED

    self.state = State.INACTIVE
    self.buyer = msg.sender
    self.value = msg.value
`

const solidityCode = `
modifier condition(bool condition_) {
    require(condition_);
    _;
}
modifier onlyBuyer() { ... }
modifier inState(State state_) { ... }

function purchase() external payable
    inState(State.Locked)
    condition(msg.value == (2 * value))
{
    state = State.Inactive;
    buyer = payable(msg.sender);
    value = msg.value;
}
`

const vyperSecurityCode = `
@nonreentrant
@external
def my_function():
    # ... protected logic ...
`

const soliditySecurityCode = `
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract MyContract is ReentrancyGuard {
    function my_function() public nonReentrant {
        // ... protected logic ...
    }
}
`

const vyperEfficiencyCode = `
@external
def transferFrom(sender: address, recipient: address, amount: uint256) -> bool:
    allowance: uint256 = self.allowance[sender][msg.sender]
    if allowance != max_value(uint256):
        self.allowance[sender][msg.sender] = allowance - amount
    self.balanceOf[sender] -= amount
    self.balanceOf[recipient] += amount
    log Transfer(sender, recipient, amount)
    return True
`

const solidityEfficiencyCode = `
function transferFrom(address from, address to, uint256 amount) public virtual returns (bool) {
    _beforeTokenTransfer(from, to, amount);
    /// @solidity memory-safe-assembly
    assembly {
        let from_ := shl(96, from)
        // Compute the allowance slot and load its value.
        mstore(0x20, caller())
        mstore(0x0c, or(from_, _ALLOWANCE_SLOT_SEED))
        let allowanceSlot := keccak256(0x0c, 0x34)
        let allowance_ := sload(allowanceSlot)
        // If the allowance is not the maximum uint256 value.
        if iszero(eq(allowance_, not(0))) {
            // Revert if the amount to be transferred exceeds the allowance.
            if gt(amount, allowance_) {
                mstore(0x00, 0x13be252b) // InsufficientAllowance().
                revert(0x1c, 0x04)
            }
            // Subtract and store the updated allowance.
            sstore(allowanceSlot, sub(allowance_, amount))
        }
        // Compute the balance slot and load its value.
        mstore(0x0c, or(from_, _BALANCE_SLOT_SEED))
        let fromBalanceSlot := keccak256(0x0c, 0x20)
        let fromBalance := sload(fromBalanceSlot)
        // Revert if insufficient balance.
        if gt(amount, fromBalance) {
            mstore(0x00, 0xf4d678b8) // InsufficientBalance().
            revert(0x1c, 0x04)
        }
        // Subtract and store the updated balance.
        sstore(fromBalanceSlot, sub(fromBalance, amount))
        // Compute the balance slot of to.
        mstore(0x00, to)
        let toBalanceSlot := keccak256(0x0c, 0x20)
        // Add and store the updated balance of to.
        sstore(toBalanceSlot, add(sload(toBalanceSlot), amount))
        // Emit the Transfer event.
        mstore(0x20, amount)
        log3(0x20, 0x20, _TRANSFER_EVENT_SIGNATURE, from, to)
    }
    _afterTokenTransfer(from, to, amount);
    return true;
}
`

export const VyperVsSolidity = async () => {
  const items = [
    {
      title: '清晰度：更少的代码，更少的歧义',
      shortTitle: '清晰度',
      description:
        'Vyper 的设计理念并非仅限于理论。了解其对清晰度、安全性和效率的关注如何在实践中转化为更简洁、更安全、更高效的代码。',
      vyperCode: <CodeHighlight code={vyperCode} lang="python" />,
      solidityCode: <CodeHighlight code={solidityCode} lang="solidity" />,
    },
    {
      title: '安全性：内置保护',
      shortTitle: '安全性',
      description:
        '以下是每种语言处理简单重入锁的方式。Vyper 的内置装饰器使安全性变得简单明了。无需导入，无需继承，只有清晰、简洁的保护。',
      vyperCode: <CodeHighlight code={vyperSecurityCode} lang="python" />,
      solidityCode: <CodeHighlight code={soliditySecurityCode} lang="solidity" />,
    },
    {
      title: '效率：简单即高效',
      shortTitle: '效率',
      description:
        '通过保持可读性和可维护性的代码实现顶级 Gas 性能。此基准测试显示 Vyper 以显著更低的代码复杂度提供了具有竞争力的 Gas 使用率。',
      vyperCode: <CodeHighlight code={vyperEfficiencyCode} lang="python" />,
      solidityCode: <CodeHighlight code={solidityEfficiencyCode} lang="solidity" />,
    },
  ]

  return <VyperVsSolidityClient items={items} />
}
