"use client";
import { useStore } from "@/lib/store/index.store";

const BurgerMenuIcon = () => {
  const isOpen = useStore((state) => state.isOpen);
  const toggleMenu = useStore((state) => state.toggleMenu);
  return (
    <button
      className="relative w-10 h-10 focus:outline-none p-1"
      onClick={toggleMenu}
    >
      <div className="absolute inset-0 flex flex-col justify-center items-center space-y-2">
        {/* Trait du haut */}
        <span
          className={`block  w-8 h-0.5 bg-slate-200 rounded-xl transition-all duration-200 ease-in-out ${
            isOpen ? "rotate-45 translate-y-2.5" : ""
          }`}
        ></span>
        {/* Trait du milieu */}
        <span
          className={`block  w-8 h-0.5 bg-slate-200 rounded-xl transition-all duration-200 ease-in-out ${
            isOpen ? "opacity-0" : ""
          }`}
        ></span>
        {/* Trait du bas */}
        <span
          className={`block  w-8 h-0.5 bg-slate-200 rounded-xl transition-all duration-200 ease-in-out ${
            isOpen ? "-rotate-45 -translate-y-2.5" : ""
          }`}
        ></span>{" "}
      </div>
    </button>
  );
};

export default BurgerMenuIcon;
