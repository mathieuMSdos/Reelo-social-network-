"use client";
import { useStore } from "@/lib/store/index.store";
import BentoContainer from "../../bentoContainer/BentoContainer";
import ItemIconMenuCard from "./ItemIconMenuCard";
// Import des icons animé Lord Icon
import lordIconHome from "@/src/assets/icons/system-regular-41-home-hover-home-2.json";
import lordIconSearch from "@/src/assets/icons/system-regular-42-search-hover-search.json";
import lordIconNotifications from "@/src/assets/icons/system-regular-46-notification-bell-hover-bell.json";
import lordIconMessages from "@/src/assets/icons/system-regular-47-chat-hover-chat.json";
import lordIconProfile from "@/src/assets/icons/system-regular-8-account-hover-account.json";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const MenuCard = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const username = useStore((state) => state.username);

  // {`/protected/${item.username}`}
  const itemsContentArray = [
    { icon: lordIconHome, text: "Home", href: "/protected/home", enableSoon: false },
    { icon: lordIconSearch, text: "Explore", href: "", enableSoon: true },
    { icon: lordIconNotifications, text: "Notifications", href: "", enableSoon: true },
    { icon: lordIconMessages, text: "Messages", href: "", enableSoon: true },
    { icon: lordIconProfile, text: "Profiles", href: `/protected/${username}`, enableSoon: false },
  ];

  return (
    <BentoContainer
      className="flex flex-col items-start justify-center w-full py-6 px-3 rounded-lg"
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <div className="w-full relative flex flex-col">
        <AnimatePresence>
          {hoveredIndex !== null && (
            <motion.div
              className="absolute bg-purpleLight/30 rounded-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{
                opacity: 1,
                scale: 1,
                top: `${hoveredIndex * 40}px`,
                height: 40,
                width: "100%",
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                transition: { duration: 0.2 },
              }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 35,
              }}
            />
          )}
        </AnimatePresence>

        <div className="relative z-10 flex flex-col">
          {itemsContentArray.map((item, index) => (
            <ItemIconMenuCard
              key={item.text}
              href={item.href}
              icon={item.icon}
              text={item.text}
              enableSoon={item.enableSoon}
              size={30}
              isHovered={hoveredIndex === index}
              onHover={() => setHoveredIndex(index)}
            />
          ))}
        </div>
      </div>
    </BentoContainer>
  );
};

export default MenuCard;
