import HeroSection from "./components/hero-section";
import VyperVsSolidity from "./components/vyper-vs-solidity";

export default function HomeModule() {
  return (
    <div className="m-auto flex min-h-screen flex-1 flex-col gap-12">
      <HeroSection />
      <VyperVsSolidity />
    </div>
  );
}
