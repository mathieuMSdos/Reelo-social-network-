import { ListOrdered } from "lucide-react";
import InputGeneric from "../../UI/inputGeneric/InputGeneric";
import BentoContainer from "../../bentoContainer/BentoContainer";


const RightMenuApp = () => {
  return (
    <div className="flex flex-col gap-2 items-center justify-start">
      <BentoContainer className=" w-full p-4 flex justify-center items-center">
        <InputGeneric className="text-textGrey text-sm w-full" type="text" showSearchIcon  />
      </BentoContainer>
    </div>
  );
};

export default RightMenuApp;
