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
    <header className="relative flex justify-center items-center px-2  ">
      {/* TRICKS GRAPHIQUE cette div ne sert qu'à faire le contour animé qui s'agrandit quand on ouvre le menu mais ne contient rien */}
      <motion.div
        className="fixed top-2 left-2 right-2 flex w-auto justify-between py-1 px-4 h-12  backdrop-blur-xl border border-darkLine rounded-2xl overflow-hidden bg-gradient-to-b from-backGroundDark/80 to-backGroundDark/70"
        initial={{ height: "3rem" }}
        animate={{ height: isOpen ? "25rem" : "3rem" }}
        transition={
          isOpen
            ? {
                type: "spring",
                stiffness: 300,
                damping: 20,
                mass: 1,
              }
            : {
                type: "spring",
                stiffness: 300,
                damping: 25,
                mass: 0.8,
              }
        }
      ></motion.div>
      <motion.nav
        className={`z-40 fixed top-2 left-2 right-2 flex w-auto justify-between items-center py-1 px-4 rounded-2xl overflow-hidden ${isOpen ? "overflow-visible":""} `}
      >
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
