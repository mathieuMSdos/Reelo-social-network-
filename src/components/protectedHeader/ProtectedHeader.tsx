"use client"
import Image from "next/image";
import Link from "next/link";
import UserDropDownMenu from "./UserDropDownMenu";



const ProtectedHeader = () => {
  return (
    <header>
      <nav className=" h-auto w-full flex justify-between items-center">
        {/* logo */}
          <Link className="flex" href="/protected/profil">
            <Image
              className="object-contain bgblu"
              src="/logo/logo_white_mode.png"
              width={130}
              height={50}
              alt="logo-icon"
            />
          </Link>
        {/* signout */}
        <UserDropDownMenu/>
      </nav>
    </header>
  );
};

export default ProtectedHeader;
