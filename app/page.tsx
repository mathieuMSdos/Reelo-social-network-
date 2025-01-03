import WelcomePageNavBar from "@/src/components/welcomePageNavBar/WelcomePageNavBar";

export default function Home() {
  return (
    <div>
      <WelcomePageNavBar />
      <div className="h-svh flex py-32">
      <h1 className="text-6xl md:w-3/5 md:text-8xl font-semibold">Retwitter, rebranded for everyone !</h1>

      </div>
    </div>
  );
}
