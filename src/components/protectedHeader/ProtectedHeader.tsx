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
      <nav className=" h-auto w-full flex justify-between items-center">
        {/* logo */}
        <Link className="flex" href="/protected/profil">
          <Image
            className="object-contain bgblu"
            src="/logo/logo_white_mode.png"
            width={150}
            height={50}
            alt="logo-icon"
          />
        </Link>
        {/* signout */}
        <BentoContainer className="flex gap-4 w-auto py-3 px-4 justify-center items-center  rounded-xl md:gap-6">
        <div className="flex flex w-auto gap-4 md:gap-6 ">
          <div className="flex gap-2 ">
            <Image
              className="rounded-full"
              src={profilImage || "/default_avatar/default_avatar.png"}
              width={38}
              height={38}
              alt="profil-picture"
            />
            <div className="hidden md:flex justify-center flex-col ">
              <p className="text-sm font-bold">{displayName}</p>
              <p className="text-xs text-textGrey">{username}</p>
            </div>
          </div>
          <div className="">
            {/* Wrapp container car sinon problème avec la fonction ()=> signOut() qui peut être utilisé que dans un  client component or là nous ne sommes pas dans un client component et c'est dommage de le passer en client alors qu'il est en server.*/}
            <SignOutButtonWrapper />
          </div>
          </div>
        </BentoContainer>
      </nav>
    </header>
  );
};

export default ProtectedHeader;
