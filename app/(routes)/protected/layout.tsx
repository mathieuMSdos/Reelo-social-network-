// layoutProtected.tsx

import BackGround from "@/src/components/UI/BackGround";
import ProtectedHeader from "@/src/components/protectedHeader/ProtectedHeader";

const layoutProtected = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className=" relative min-h-screen w-full text-textBlack">
      <BackGround />
      <ProtectedHeader />
      <h1>Protected layout</h1>
      <div>{children}</div>
    </main>
  );
};

export default layoutProtected;
