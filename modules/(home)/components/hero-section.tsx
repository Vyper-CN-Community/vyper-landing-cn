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
    </div>
  );
}
