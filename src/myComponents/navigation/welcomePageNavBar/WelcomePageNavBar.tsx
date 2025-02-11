"use client";
import { useStore } from "@/lib/store/index.store";
import Lenis from "@studio-freight/lenis";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import BurgerMenuIcon from "../../UI/BurgerMenuIcon/BurgerMenuIcon";
import PrimaryButtonSpecial from "../../UI/primaryButton/PrimaryButtonSpecial";
import SecondaryButton from "../../UI/secondaryButton/SecondaryButton";
import { navItems } from "../navItems";

interface LenisInstance {
  raf: (time: number) => void;
  destroy: () => void;
  scrollTo: (element: HTMLElement, options?: { offset: number }) => void;
}

const WelcomePageNavBar: React.FC = () => {
  const [lenis, setLenis] = useState<LenisInstance | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  // ZUSTAND
  const isOpen = useStore((state: { isOpen: boolean }) => state.isOpen);
  const setIsOpen = useStore(
    (state: { setIsOpen: (isOpen: boolean) => void }) => state.setIsOpen
  );

  // hero
  // Initialiser Lenis une seule fois
  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.5,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    function raf(time: number) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    setLenis(lenisInstance);

    return () => {
      lenisInstance.destroy();
    };
  }, []);

  // Fonction de navigation et scroll
  const handleNavigation = useCallback(
    (href: string) => {
      if (href.startsWith("#")) {
        // Si on n'est pas sur la page d'accueil, rediriger d'abord
        if (pathname !== "/") {
          router.push(`/${href}`);
          return;
        }

        // Si on est sur la page d'accueil, scroll
        if (lenis) {
          const targetId = href.replace("#", "");
          const element = document.getElementById(targetId);
          if (element) {
            lenis.scrollTo(element, {
              offset: 50, // régler pour ajuster l'aterrisage du scroll automatique qui enmène vers la section #
            });
          }
        }
      } else {
        // Navigation normale pour les autres pages
        router.push(href);
      }
    },
    [lenis, pathname, router]
  );

  // Pour le menu mobile
  const handleMobileClick = (href: string) => {
    handleNavigation(href);
    setIsOpen(false); // Ferme le menu
  };

  // Fermer le menu dropdown automatiquement si la fenêtre s'alargie au delà de md
  useEffect(() => {
    const closeDropDownFunction = () => {
      const currentWidth = window.innerWidth;
      if (currentWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", closeDropDownFunction);
    return () => window.removeEventListener("resize", closeDropDownFunction);
  }, [setIsOpen]);

  // FRAMER MOTION
  const menuVariants: Variants = {
    open: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
    closed: {
      opacity: 0,
    },
  };

  const itemVariants: Variants = {
    open: {
      opacity: 1,
      y: 5,
      transition: {
        duration: 0.1,
        ease: "easeOut",
      },
    },
    closed: {
      opacity: 0,
      y: 0,
    },
  };

  return (
    <header className="w-full relative z-40 flex justify-center items-center px-2 md:w-2/3  ">
      <motion.div
        className="w-full mx-auto fixed top-2  flex justify-between py-1 px-4 h-16 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden bg-gradient-to-br from-transparent to-slate-100/80 shadow-sm md:w-2/3 md:right-2 md:left-2 "
        initial={{ height: "4rem" }}
        animate={{ height: isOpen ? "18rem" : "4rem" }} // définir la hauteur du menu déroulant
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
      />
      <motion.nav
        className={`w-full h-16 mx-auto z-50 fixed top-2 left-2 right-2 flex justify-between items-center py-1 px-4 rounded-2xl overflow-hidden bg-transparent md:w-2/3  ${
          isOpen ? "overflow-visible" : ""
        } `}
      >
        <button onClick={() => handleMobileClick("#hero")}>
          <Image
            src="/logo/Logo_Reello_black.png"
            width={120}
            height={50}
            alt="logo"
          />
        </button>

        {/* Mobile menu items */}
        <motion.ul
          className="md:hidden absolute mt-4 px-4 flex flex-col -translate-x-4 w-full top-14 gap-2 font-semibold"
          variants={menuVariants}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
        >
          {navItems.map((item) => (
            <motion.li
              key={item.name}
              className="relative py-4 transition-all duration-500 border-b border-slate-300 last:border-b-0 text-darkLine/90 cursor-pointer"
              variants={itemVariants}
              onClick={() => handleMobileClick(item.href)}
            >
              {item.name}
            </motion.li>
          ))}
        </motion.ul>

        {/* Desktop menu items */}
        <ul className="hidden md:flex gap-5 font-semibold text-darkLine/90">
          {navItems.map((item) => (
            <li
              key={item.name}
              className="hover:text-purpleLight transition-all duration-300 group cursor-pointer"
              onClick={() => handleNavigation(item.href)}
            >
              {item.name}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3 md:gap-4">
          <Link href="/login">
            <SecondaryButton className="px-3 py-0" text="Log in" />
          </Link>

          <Link href="/signup">
            <PrimaryButtonSpecial text="Sign up" />
          </Link>

          <div className="w-8 h-8 md:hidden">
            <BurgerMenuIcon />
          </div>
        </div>
      </motion.nav>
    </header>
  );
};

export default WelcomePageNavBar;
