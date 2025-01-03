"use client";
import { useStore } from "@/lib/store/index.store";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import BurgerMenuIcon from "../design/BurgerMenuIcon/BurgerMenuIcon";
import PrimaryButton from "../design/primaryButton/PrimaryButton";
import SecondaryButton from "../design/secondaryButton/SecondaryButton";

const WelcomePageNavBar = () => {
  // ZUSTAND
  const isOpen = useStore((state) => state.isOpen);

  const navItems = [
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="relative flex justify-center items-center  ">
      <motion.div
        className={`absolute inset-0 flex w-full justify-between items-start  py-3 px-4 backdrop-blur-md border border-darkLine rounded-2xl`}
        initial={{ height: "4rem" }}
        animate={{
          height: isOpen ? "20rem" : "4rem",
        }}
        transition={
          isOpen
            ? {
                type: "spring",
                stiffness: 300,
                damping: 18,
                mass: 0.8,
              }
            : {
                type: "spring",
                stiffness: 200,
                damping: 21,
                mass: 0.9,
              }
        }
      />
      <motion.nav className="z-40 absolute flex inset-0 justify-between items-center py-3 px-4 ">
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
        <div className="flex items-center gap-3 md:gap-6">
          <SecondaryButton
            text="Login"
            onClick={async () => await signIn("google")}
          />
          <PrimaryButton
            text="Sign up"
            onClick={async () => await signIn("google")}
          />
          {/* burger menu */}
          <div className="w-8 h- md:hidden">
            <BurgerMenuIcon />
          </div>
        </div>
      </motion.nav>

      {/* <DropdownMenu navItems={navItems} /> */}
    </header>
  );
};

export default WelcomePageNavBar;
