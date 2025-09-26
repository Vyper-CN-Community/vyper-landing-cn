import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { ReactNode } from "react";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return <MaxWidthWrapper className="flex flex-1">{children}</MaxWidthWrapper>;
}
