import { CodeHighlight } from "@/components/shared/code-highlight";

export default function VyperVsSolidity() {
  return (
    // TODO: remove mb-20
    <div className="mx-auto mb-20 flex w-full flex-1 flex-col gap-8">
      <header className="flex flex-col items-center justify-center gap-2">
        <h3 className="text-2xl font-semibold">探索 Vyper 优势</h3>
        <p className="border-b border-dashed border-gray-600">
          Vyper
          的设计理念并非仅限于理论。了解其对清晰度、安全性和效率的关注如何在实践中转化为更简洁、更安全、更高效的代码。
        </p>
      </header>

      {/* TODO: extract */}
      <h3 className="border-l px-4">清晰度：更少的代码，更少的歧义</h3>
      <main className="flex gap-4">
        <CodeHighlight className="flex-1" lang="vyper">
          {`
@external
def purchase():
    assert msg.value == 2 * self.value
    assert self.state == State.LOCKED
    
    self.state = State.INACTIVE
    self.buyer = msg.sender
    self.value = msg.value
        `}
        </CodeHighlight>

        <CodeHighlight className="flex-1" lang="solidity">
          {`
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
        `}
        </CodeHighlight>
      </main>
    </div>
  );
}
