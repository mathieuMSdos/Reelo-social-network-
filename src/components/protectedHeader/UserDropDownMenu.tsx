"use client";
import { useStore } from "@/lib/store/index.store";
import { motion } from "framer-motion";
import { ChevronDown, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import BentoContainer from "../bentoContainer/BentoContainer";

const UserDropDownMenu = () => {
  //ZUSTAND
  const username = useStore((state) => state.username);
  const displayName = useStore((state) => state.displayName);
  const profilImage = useStore((state) => state.image);

  // LOCAL STATE
  const [isOpen, setIsOpen] = useState(false);

  //Use ref
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // USEEFFECT pour fermer le dropdown si l'utilisateur clique à l'extérieur du container
  useEffect(() => {
    const handleClick = (e:MouseEvent) => {
      const target = e.target as Node
      if (!containerRef.current?.contains(target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClick);
    // cleanup function
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <BentoContainer className="w-72 py-3 px-4 rounded-xl">
        <div className="flex justify-between w-full gap-4 md:gap-6">
          <div className="flex gap-2">
            <Image
              className="rounded-full"
              src={profilImage || "/default_avatar/default_avatar.png"}
              width={38}
              height={38}
              alt="profil-picture"
            />
            <div className="hidden md:flex justify-center flex-col">
              <p className="text-sm font-bold">{displayName}</p>
              <p className="text-xs text-textGrey">{username}</p>
            </div>
          </div>
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            animate={{ rotate: isOpen ? -180 : 0 }}
            transition={{ duration: 0.1 }}
          >
            <ChevronDown />
          </motion.button>
        </div>
      </BentoContainer>

      <motion.div
        className="absolute top-full left-0 right-0 mt-1 z-50 overflow-hidden"
        animate={{
          height: isOpen ? contentRef.current?.scrollHeight : 0,
          opacity: isOpen ? 1 : 0,
        }}
        initial={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        <div ref={contentRef}>
          <BentoContainer className="w-full py-3 px-4 rounded-lg ">
            <ul className="w-full flex flex-col items-start justify-start">
              <li
                className="w-full flex items-center justify-start gap-1 hover:bg-purpleLight/30 rounded-lg py-2 px-3 transition-all duration-150 ease-in-out cursor-pointer"
                onClick={() => signOut()}
              >
                <LogOut className="text-textGrey" size={23} />
                <button className="text-textGrey font-semibold">
                  Sign out
                </button>
              </li>
            </ul>
          </BentoContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default UserDropDownMenu;
