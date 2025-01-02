// layoutProtected.tsx

import BackGround from "@/src/components/design/BackGround";
import SignOutButton from "@/src/components/SignOutButton";

const layoutProtected = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className=" relative min-h-screen w-full">
      <BackGround/>
      <SignOutButton/>
      <h1>Protected layout</h1>
      <div>{children}</div>
    </main>
  );
};

export default layoutProtected;