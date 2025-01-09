import Image from "next/image";
import Link from "next/link";
import BentoContainer from "../bentoContainer/BentoContainer";
import SignOutButtonWrapper from "../Wrapper/SignOutWrapper";

interface ProtectedHeaderProps {
  username: string | null;
  displayName: string | null;
  profilImage: string | null;
}

const ProtectedHeader = ({
  username,
  displayName,
  profilImage,
}: ProtectedHeaderProps) => {
  return (
    <header>
      <nav className="h-16 flex justify-between">
        <Link className="flex" href="/protected/profil">
          <Image
            className="object-contain"
            src="/logo/logo_white_mode.png"
            width={150}
            height={50}
            alt="logo-icon"
          />
        </Link>
        <BentoContainer className="flex w-72 p-4 justify-center items-center gap-1 rounded-xl">
          <div className="flex gap-3 w-2/3 ">
            <Image
              className="rounded-full"
              src={profilImage || "/default_avatar/default_avatar.png"}
              width={40}
              height={40}
              alt="profil-picture"
            />
            <div className="flex justify-center flex-col ">
              <p className="text-sm font-semibold">{displayName}</p>
              <p className="text-xs text-textGrey">{username}</p>
            </div>
          </div>
          <div className="">
            {/* Wrapp container car sinon problème avec la fonction ()=> signOut() qui peut être utilisé que dans un  client component or là nous ne sommes pas dans un client component et c'est dommage de le passer en client alors qu'il est en server.*/}
            <SignOutButtonWrapper />
          </div>
        </BentoContainer>
      </nav>
    </header>
  );
};

export default ProtectedHeader;
