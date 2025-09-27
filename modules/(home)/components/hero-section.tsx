import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="m-auto flex flex-1 flex-col gap-12">
      <h2 className="flex flex-col items-center gap-2 text-7xl">
        <span className="font-semibold"> Vyper </span>
        <span>构建安全可靠的智能合约</span>
        <span className="text-6xl">像 Python 一样简单</span>
      </h2>
      <p className="flex flex-col items-center justify-center">
        <span>
          Vyper 是一种智能合约语言，始终专注于安全性、 简洁性和可读性。
        </span>
        <span>
          它使开发者能够为 EVM 编写简洁、 可审计且节省 gas
          的代码，避免常见的陷阱。
        </span>
      </p>

      {/* TODO: go to the docs */}
      <Link
        href={"/"}
        className="m-auto w-fit cursor-pointer text-3xl underline underline-offset-1"
      >
        开始
      </Link>

      <section className="flex justify-between gap-6">
        <div>
          <h3 className="mb-1 text-xl">安全设计</h3>
          <p className="text-sm text-gray-700">
            编写更安全的代码，自然而然。Vyper
            的设计旨在消除各种类型的漏洞。借助内置的溢出检查、重入保护和边界检查，您可以专注于逻辑，而无需费力规避语言级陷阱。
          </p>
        </div>
        <div>
          <h3 className="mb-1 text-xl">毫不妥协的可读性</h3>
          <p className="text-sm text-gray-700">
            如果您了解 Python，就可以使用 Vyper
            进行构建。其简洁的语法使代码易于阅读、审查和审计。更少的歧义意味着更低的风险和更快的开发周期。
          </p>
        </div>
        <div>
          <h3 className="mb-1 text-xl">最佳性能，无需组装</h3>
          <p className="text-sm text-gray-700">
            获得媲美低级代码的 gas 性能，同时又不牺牲清晰度。Vyper
            强大的编译器能够从高级 Python
            代码生成高度优化的字节码，因此您无需妥协。
          </p>
        </div>
      </section>
    </div>
  );
}
