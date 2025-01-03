"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import BurgerMenuIcon from "../design/BurgerMenuIcon/BurgerMenuIcon";
import PrimaryButton from "../design/primaryButton/PrimaryButton";

const WelcomePageNavBar = () => {
  const navItems = [
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="flex justify-center items-center">
      <nav className="flex w-full  justify-between items-center">
        <Link href="/">
          <Image
            src="/logo/Logo_Retwitter.png"
            width={170}
            height={50}
            alt="logo"
          />
        </Link>
        <ul className="hidden md:flex gap-5  ">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <li
                className="hover:text-purpleLight transition-all duration-500"
                key={item.name}
              >
                {item.name}
              </li>
            </Link>
          ))}
        </ul>
        <div className="hidden md:flex">
          <PrimaryButton
            text="Login"
            onClick={async () => await signIn("google")}
          />
        </div>
        {/* burger menu */}
        <div className="w-10 h-10">
          <BurgerMenuIcon />
        </div>
      </nav>
    </header>
  );
};

export default WelcomePageNavBar;
