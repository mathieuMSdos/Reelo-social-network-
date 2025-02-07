// layoutProtected.tsx

import { auth } from "@/auth";
import ProfileInitializer from "@/src/myComponents/welcomePageNavBar/ProfileInitializer/ProfileInitializer";
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
      <div className="flex flex-col gap-2 w-full min-h-screen max-w-screen-xl mx-auto pb-6 text-textBlack bg-transparent">
        <ProfileInitializer session={session} />
        {/* <BackGroundOnboarding /> */}

        {children}
      </div>
    </>
  );
};

export default layoutProtected;
