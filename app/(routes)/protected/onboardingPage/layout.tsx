// layoutProtected.tsx

import BackgroundOnboarding from "@/src/myComponents/UI/background/backGroundOnboarding/BackGroundOnboarding";

const layoutOnboarding = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <div className="flex flex-col gap-2 w-full min-h-screen max-w-screen-xl mx-auto pb-6 text-textBlack bg-light">
        <BackgroundOnboarding />

        {children}
      </div>
    </>
  );
};

export default layoutOnboarding;
