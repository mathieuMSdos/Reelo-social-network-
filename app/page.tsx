import { Hero7 } from "@/src/components/landingPage/heroSection/Hero7";
import { AuroraBackground } from "@/src/components/UI/aurora-background";
import WelcomePageNavBar from "@/src/components/welcomePageNavBar/WelcomePageNavBar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full">
      <WelcomePageNavBar />
      {/* section hero */}
      <div className="flex flex-col">
        <AuroraBackground>
          <Hero7 />
        </AuroraBackground>
{/* section image produit */}
      <div className="w-full">
        <Image
          className="object-contain translate-y-[90%]"
          src="/assetLp/reello_asset_dashboard.webp"
          alt="dashboard"
          fill
          priority
        />
        </div>
      </div>
    </div>
  );
}
