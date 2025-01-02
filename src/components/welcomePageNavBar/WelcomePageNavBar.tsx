"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import PrimaryButton from "../design/primaryButton/PrimaryButton";
import Image from "next/image";

const WelcomePageNavBar = () => {
  const navItems = [
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="flex justify-center items-center">
      <nav className="flex w-full  justify-between items-center">

        <div className="flex gap-28 items-center">
          <div className="flex items-center">
            <Image src="/logo/Logo_Retwitter.png" width={50} height={50}/>
            <p>Retwitter</p>
          </div>
          <ul className="flex gap-5">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <li key={item.name}>{item.name}</li>
              </Link>
            ))}
          </ul>
        </div>

        <div>
          <PrimaryButton
            text="Login"
            onClick={async () => await signIn("google")}
          />
        </div>
      </nav>
    </header>
  );
};

export default WelcomePageNavBar;
