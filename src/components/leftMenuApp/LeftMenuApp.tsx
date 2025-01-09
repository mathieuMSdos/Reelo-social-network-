import PrimaryButton from "../UI/primaryButton/PrimaryButton";
import MenuCard from "./menuCard/MenuCard";
import ProfilCard from "./profilCard/ProfilCard";
import StatsCard from "./statsCard/StatsCard";

const LeftMenuApp = () => {
  return (
    <div className="flex flex-col items-center justify-start">
      <ProfilCard />
      <div>
        <StatsCard />
        <StatsCard />
      </div>
      <MenuCard/>
      <PrimaryButton text="New Post"/>
    </div>
  );
};

export default LeftMenuApp;
