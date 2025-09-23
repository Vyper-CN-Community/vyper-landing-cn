import Image from "next/image";
import vyperColorLogo from "@/public/asset/vyper-color-logo.svg";

export default function VyperLogo() {
  return (
    <Image
      src={vyperColorLogo}
      alt="vyper logo"
      height={32}
      width={32}
      className="m-auto"
    />
  );
}
