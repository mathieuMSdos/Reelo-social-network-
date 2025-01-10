import loadingIconLord from "@/src/assets/icons/system-regular-41-home-hover-home-2.json";
import GenericIcon from "../../UI/lordIcons/GenericIcon";

const ItemIconMenuCard = ({ icon, text, size }) => {
  return (
    <div className="flex justify-center items-center text-textGrey font-semibold gap-1.5">
      <GenericIcon
        icon={icon}
        colorize="var(--textGrey)"
        size={size}
      />
      <p className=" ">{text}</p>
    </div>
  );
};

export default ItemIconMenuCard;
q