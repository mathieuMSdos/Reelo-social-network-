import WelcomePageNavBar from "@/src/myComponents/navigation/welcomePageNavBar/WelcomePageNavBar";

interface layoutProps {
  children: React.ReactNode;
}

const layout = ({ children }: layoutProps) => {
  return (
    <div>
      <WelcomePageNavBar />
      {children}
    </div>
  );
};

export default layout;
