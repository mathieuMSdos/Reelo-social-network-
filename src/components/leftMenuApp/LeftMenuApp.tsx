import { NotebookPen } from "lucide-react";
import WrapperToggleModal from "../CRUD components/createPostModal/wrapperOpenModalButton/WrapperOpenModalButton";
import PrimaryButton from "../UI/primaryButton/PrimaryButton";
import MenuCard from "./menuCard/MenuCard";
import ProfilCard from "./profilCard/ProfilCard";
import StatsCard from "./statsCard/StatsCard";

const LeftMenuApp = () => {
  return (
    <div className="flex flex-col gap-2 items-center justify-start">
      <ProfilCard />
      <div className="w-full flex justify-center items-center gap-2 ">
        <StatsCard className="w-full py-6" stats="10,876" text="Followers" />
        <StatsCard className="w-full py-6" stats="176" text="Following" />
      </div>
      <MenuCard />
      <WrapperToggleModal>
        <PrimaryButton
          className=" font-semibold w-full px-3 py-3"
          text="New Post"
        >
          <NotebookPen size={20} strokeWidth={2.5} />
        </PrimaryButton>
      </WrapperToggleModal>
    </div>
  );
};

export default LeftMenuApp;
