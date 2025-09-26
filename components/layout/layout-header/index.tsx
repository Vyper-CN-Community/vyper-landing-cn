"use client";

import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import VyperLogo from "@/components/shared/vyper-logo";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Link from "next/link";

// TODO: external false
const routes = [
  {
    name: "Blog",
    href: "https://blog.vyperlang.org/",
    pattern: /^\/blog($|\/)/,
    external: true,
  },
  {
    name: "Docs",
    href: "https://docs.vyperlang.org/en/latest/",
    pattern: /^\/docs($|\/)/,
    external: true,
  },
  {
    name: "Contribute",
    href: "https://github.com/vyperlang/vyper/issues",
    pattern: /^\/contribute($|\/)/,
    external: true,
  },
];

export default function LayoutHeader() {
  return (
    <header className="sticky h-16 border-b border-dashed">
      <MaxWidthWrapper className="flex justify-between">
        <h1 className="flex items-center justify-center gap-4 py-2">
          <Link href={"/"}>
            <VyperLogo />
          </Link>
          <div className="flex flex-col">
            {/* TODO: font style */}
            <span className="text-xl font-extrabold underline">Vyper</span>
            <p className="text-sm">Pythonic language for Ethereum</p>
          </div>
        </h1>

        <ul className="flex items-center gap-4">
          {routes.map((v) => (
            <li key={v.href} className="hover:underline">
              <Link href={v.href} target={v.external ? "_blank" : "_self"}>
                {v.name}
              </Link>
            </li>
          ))}
          <ModeToggle className="-ml-2" />
        </ul>
      </MaxWidthWrapper>
    </header>
  );
}
