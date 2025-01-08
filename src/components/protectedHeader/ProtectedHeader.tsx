import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import Container from "../container/Container";
import SignOutButton from "../design/SignOutButton";

// TYPAGE
interface ProfilInfos {
  displayName: string | null | undefined;
  username: string | null | undefined;
  image: string | null | undefined;
}

const ProtectedHeader = async () => {
  const session = await auth();

  const profilInfos: ProfilInfos = {
    displayName: session?.user?.displayName,
    username: session?.user?.username,
    image: session?.user?.image,
  };
  return (
    <header>
      <nav className="h-16 flex justify-between border border-slate-900">
        <Link className="flex" href="/profil">
          <Image
            className="object-contain"
            src="/logo/logo_white_mode.png"
            width={140}
            height={50}
            alt="logo-icon"
          />
        </Link>
        {profilInfos && (
          <Container className="flex w-72 p-4 justify-center items-center gap-2">
            <div className="flex gap-4 w-2/3 ">
              <Image className="rounded-full"
                src={profilInfos.image || "/default_avatar/default_avatar.png"}
                width={50}
                height={50}
                alt="profil-picture"
              />
              <div className="flex justify-center flex-col ">
                <p className="text-sm font-semibold">{profilInfos.displayName}</p>
                <p className="text-xs">{profilInfos.username}</p>
              </div>
            </div>
            <div className="">
              <SignOutButton />
            </div>
          </Container>
        )}
      </nav>
    </header>
  );
};

export default ProtectedHeader;
