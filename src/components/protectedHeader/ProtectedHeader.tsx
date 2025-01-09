import { auth } from "@/auth";
import { upperFirstLetterOfAString } from "@/lib/utils/scriptJS/upperCaseFirstLetter";
import Image from "next/image";
import Link from "next/link";
import Container from "../container/Container";
import SignOutButtonWrapper from "../Wrapper/SignOutWrapper";

// TYPAGE
interface ProfilInfos {
  displayName: string | null | undefined;
  username: string | null | undefined;
  image: string | null | undefined;
}

const ProtectedHeader = async () => {
  const session = await auth();

  const profilInfos: ProfilInfos = {
    displayName: upperFirstLetterOfAString(session?.user?.displayName),
    username: session?.user?.username,
    image: session?.user?.image,
  };

  return (
    <header>
      <nav className="h-16 flex justify-between">
        <Link className="flex" href="/profil">
          <Image
            className="object-contain"
            src="/logo/logo_white_mode.png"
            width={150}
            height={50}
            alt="logo-icon"
          />
        </Link>
        {profilInfos && (
          <Container className="flex w-72 p-4 justify-center items-center gap-1 rounded-xl">
            <div className="flex gap-3 w-2/3 ">
              <Image
                className="rounded-full"
                src={profilInfos.image || "/default_avatar/default_avatar.png"}
                width={40}
                height={40}
                alt="profil-picture"
              />
              <div className="flex justify-center flex-col ">
                <p className="text-sm font-semibold">
                  {profilInfos.displayName}
                </p>
                <p className="text-xs text-textGrey">{profilInfos.username}</p>
              </div>
            </div>
            <div className="">
              {/* Wrapp container car sinon problème avec la fonction ()=> signOut() qui peut être utilisé que dans un  client component.*/}
              <SignOutButtonWrapper />
            </div>
          </Container>
        )}
      </nav>
    </header>
  );
};

export default ProtectedHeader;
