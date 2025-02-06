import { Hero7 } from "@/src/components/landingPage/heroSection/Hero7";
import WelcomePageNavBar from "@/src/components/welcomePageNavBar/WelcomePageNavBar";

export default function Home() {
  return (
    <div>
      <WelcomePageNavBar />
      <div className="flex flex-col">
        <Hero7 />
      </div>
    </div>
  );
}
