"use client"
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/lib/store/index.store";
import Link from "next/link";

interface DropdownMenuProps {
  navItems: {
    name: string;
    href: string;
  }[];
}

const DropdownMenu = ({ navItems }: DropdownMenuProps) => {
  const isOpen = useStore((state) => state.isOpen);
  const toggleMenu = useStore((state) => state.toggleMenu);

  const containerVariants = {
    hidden: { height: 0 },
    visible: { 
      height: "calc(70vh - 4rem)",
      transition: {
        type: "spring",
        stiffness: 350,
        damping: 21,
        mass: 0.7,
        staggerChildren: 0.1,
      }
    },
    exit: { 
      height: 0,
      transition: {
        type: "tween",
        duration: 0.15,
        ease: "easeInOut",
        staggerChildren: 0.05,
        staggerDirection: -1,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.2,
        ease: "easeOut",
      }
    },
    exit: { 
      y: -20, 
      opacity: 0,
      transition: {
        duration: 0.15,
        ease: "easeInOut"
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute flex justify-center items-start inset-0 top-16 border-x border-b border-darkLine overflow-hidden rounded-b-2xl z-30 backdrop-blur-md bg-gradient-to-b from-backGroundDark/80 to-backGroundDark/30"
        >
          <motion.ul className="flex flex-col p-4 gap-1 justify-center items-center">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href} onClick={toggleMenu}>
                <motion.li
                  variants={itemVariants}
                  className="hover:text-purpleLight px-20 py-2 transition-all duration-500"
                >
                  {item.name}
                </motion.li>
              </Link>
            ))}
          </motion.ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DropdownMenu;