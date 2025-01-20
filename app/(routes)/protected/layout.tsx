// layoutProtected.tsx

import { auth } from "@/auth";
import WrapperShowModal from "@/src/components/CRUD components/createPostModal/wrapperShowModal/WrapperShowModal";
import BackGround from "@/src/components/UI/BackGround";
import LeftMenuApp from "@/src/components/leftMenuApp/LeftMenuApp";
import ProtectedHeaderWrapper from "@/src/components/protectedHeader/ProtectedHeaderWrapper";
import ProfileInitializer from "@/src/components/welcomePageNavBar/ProfileInitializer/ProfileInitializer";
import { redirect } from "next/navigation";

const layoutProtected = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  // On met la vérif de session dans le layout pour que la vérif s'effectue sur toutes les pages routées (protected)
  const session = await auth(); // Vérifie si l'utilisateur est authentifié

  if (!session) {
    redirect("/"); // Redirige vers la page d'acceuil si l'utilisateur n'est pas authentifié
  }

  return (
    <>
    <div className="flex flex-col gap-2 w-full min-h-screen max-w-screen-xl mx-auto pb-6 text-textBlack bg-backgrounfLight">
    <ProtectedHeaderWrapper/>

      <div className=" flex gap-20 w-full    ">
        <ProfileInitializer session={session} />
        <BackGround />
        {/* Menu */}
        <aside className="sticky top-0 shrink-0 h-screen max-w-52">
          <LeftMenuApp />
        </aside>
        {/* Contenu dynamique */}
        <div className="flex-1 min-h-screen ">
          <ProfileInitializer session={session} />
          {children}
        </div>
      </div>
      <WrapperShowModal />
    </div>
    </>
  );
};

export default layoutProtected;
