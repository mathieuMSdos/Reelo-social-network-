import { WrapperMarquee } from "@/src/components/magicui/WrapperMarquee";
import FaqComponent from "@/src/myComponents/landingPage/FAQComponent/FaqComponent";
import FeatureCard from "@/src/myComponents/landingPage/FeatureCard/FeatureCard";
import Footer from "@/src/myComponents/navigation/footer/Footer";
import { Hero7 } from "@/src/myComponents/landingPage/heroSection/Hero7";
import { LogoBlock } from "@/src/myComponents/landingPage/logoClient/LogoBlock";
import CustomPricing from "@/src/myComponents/landingPage/pricing/CustomPricing";
import WelcomePageNavBar from "@/src/myComponents/navigation/welcomePageNavBar/WelcomePageNavBar";
import { AuroraBackground } from "@/src/myComponents/UI/aurora-background";

export default function Home() {
  return (
    <div className="w-full overflow-x-hidden">
      <WelcomePageNavBar />
      {/* section hero */}
      <main className="mx-auto">
        <div className="flex flex-col">
          <section id="hero">
            <AuroraBackground>
              <Hero7 />
            </AuroraBackground>
          </section>

          {/* section product image */}
          <section className="w-full px-2">
            {/* <SectionProductImage /> */}
          </section>
          {/* trsut logo */}
          <section className="py-20">
            <LogoBlock />
          </section>
          {/* features sections */}
          <section className="relative w-full" id="features">
            <FeatureCard />
          </section>
          {/* Princing */}
          <section id="pricing">
            <CustomPricing />
          </section>
          {/* Testimonials */}
          <section>
            <WrapperMarquee />
          </section>
          <section id="faq">
            <FaqComponent />
          </section>
          <section>
            <Footer />
          </section>
        </div>
      </main>
    </div>
  );
}
