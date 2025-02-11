import WelcomePageNavBar from "@/src/myComponents/navigation/welcomePageNavBar/WelcomePageNavBar";

interface layoutProps {
  children: React.ReactNode;
}

const layout = ({ children }: layoutProps) => {
  return (
    <div className="w-full h-min-screen ">
      <WelcomePageNavBar />
      {children}
    </div>
  );
};

export default layout;
