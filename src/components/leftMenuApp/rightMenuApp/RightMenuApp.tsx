import InputSearchProfil from "./inputSearchPorfile/InputSearchProfil";
import WathsHappen from "./wathsHappen/WathsHappen";
import WhoToFollow from "./whoToFollow/WhoToFollow";

const RightMenuApp = () => {
  return (
    <div className="flex flex-col gap-2 items-center justify-start w-full h-fit">
      <InputSearchProfil />
      <WhoToFollow />
      <WathsHappen />
    </div>
  );
};

export default RightMenuApp;
