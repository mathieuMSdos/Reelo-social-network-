import { Hero7 } from "@/src/components/landingPage/heroSection/Hero7";
import { AuroraBackground } from "@/src/components/UI/aurora-background";
import WelcomePageNavBar from "@/src/components/welcomePageNavBar/WelcomePageNavBar";

export default function Home() {
  return (
    <div className="w-full">
      <WelcomePageNavBar />
      <div className="flex flex-col">
        <AuroraBackground>
          <Hero7 />
        </AuroraBackground>
      </div>
    </div>
  );
}
