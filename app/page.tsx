import FeatureCard from "@/src/myComponents/landingPage/FeatureCard/FeatureCard";
import { Hero7 } from "@/src/myComponents/landingPage/heroSection/Hero7";
import { LogoBlock } from "@/src/myComponents/landingPage/logoClient/LogoBlock";
import SectionProductImage from "@/src/myComponents/landingPage/sectionProductImage/SectionProductImage";
import { AuroraBackground } from "@/src/myComponents/UI/aurora-background";
import WelcomePageNavBar from "@/src/myComponents/welcomePageNavBar/WelcomePageNavBar";

export default function Home() {
  return (
      <div className="w-full overflow-x-hidden">
        <WelcomePageNavBar />
        {/* section hero */}
        <main className="mx-auto">
          <div className="flex flex-col">
            <AuroraBackground>
              <Hero7 />
            </AuroraBackground>
            {/* section image produit */}
            <div className="w-full px-2"></div>
            <SectionProductImage />
            <LogoBlock />
            <FeatureCard />
          </div>
        </main>
      </div>
  );
}
