import { useStore } from "@/lib/store/index.store";
import FeedGeneraColumn from "@/src/components/CRUD components/feedGeneral/FeedGeneraColumn";
import RightMenuApp from "@/src/components/leftMenuApp/rightMenuApp/RightMenuApp";

export default async function Home() {
  // ZUSTAND : on récupère l'username de l'utilisateur connecté
  
  return (
    <div className="w-full flex gap-20 justify-between min-h-screen  ">
      <div className=" flex flex-col gap-10 w-full min-w-56 max-w-screen-xl ">
        <FeedGeneraColumn/>
      </div>
      <div className="w-full max-w-64 bg-purple-100">
        <RightMenuApp />
      </div>
    </div>
  );
}
