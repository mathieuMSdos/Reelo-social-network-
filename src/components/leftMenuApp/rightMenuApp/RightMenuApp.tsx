import BentoContainer from "../../bentoContainer/BentoContainer";
import InputSearchProfil from "./inputSearchPorfile/InputSearchProfil";
import WhoToFollow from "./whoToFollow/WhoToFollow";

const RightMenuApp = () => {
  return (
    <div className="flex flex-col gap-3 items-center justify-start w-full h-fit overflow-y-auto">
      <InputSearchProfil />
      <WhoToFollow/>
    </div>
  );
};

export default RightMenuApp;
