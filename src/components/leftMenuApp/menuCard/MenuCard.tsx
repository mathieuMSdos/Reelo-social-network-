import BentoContainer from "../../bentoContainer/BentoContainer";
import ItemIconMenuCard from "./ItemIconMenuCard";
// Import des icons animé Lord Icon
import lordIconHome from "@/src/assets/icons/system-regular-41-home-hover-home-2.json";
import lordIconSearch from "@/src/assets/icons/system-regular-42-search-hover-search.json";
import lordIconNotifications from "@/src/assets/icons/system-regular-46-notification-bell-hover-bell.json";
import lordIconMessages from "@/src/assets/icons/system-regular-47-chat-hover-chat.json";
import lordIconProfile from "@/src/assets/icons/system-regular-8-account-hover-account.json";

const MenuCard = () => {
  const itemsContentArray = [
    { icon: lordIconHome, text: "Home" },
    { icon: lordIconSearch, text: "Explore" },
    { icon: lordIconNotifications, text: "Notifications" },
    { icon: lordIconMessages, text: "Messages" },
    { icon: lordIconProfile, text: "Profiles" },
  ];

  return (
    <BentoContainer className=" flex flex-col gap-1 items-start justify-center w-full py-6 px-6 rounded-xl">
      {/* <ItemIconMenuCard icon={lordIconHome} text="ok" /> */}
      {itemsContentArray.map((item) => (
        <ItemIconMenuCard icon={item.icon} text={item.text} size={30}></ItemIconMenuCard>
      ))}
    </BentoContainer>
  );
};

export default MenuCard;
