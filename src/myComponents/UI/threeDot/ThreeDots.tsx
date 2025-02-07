import { Ellipsis } from "lucide-react";

const ThreeDots = () => {
  return (
    <span className="flex items-center justify-center text-textGrey hover:bg-inputLightBG/70 p-2 rounded-md transition-all duration-100 cursor-pointer">
      <Ellipsis size={18}  />
    </span>
  );
};

export default ThreeDots;
