import FeedGeneralColumn from "@/src/myComponents/CRUDComponents/feedGeneral/FeedGeneralColumn";
import RightMenuApp from "@/src/myComponents/leftMenuApp/rightMenuApp/RightMenuApp";

export default async function Home() {
  // ZUSTAND : on récupère l'username de l'utilisateur connecté

  return (
    <div className="relative w-full flex gap-20 justify-between min-h-screen ">
      <div className=" flex flex-col gap-10 w-full min-w-56 max-w-screen-xl ">
        <FeedGeneralColumn />
      </div>

      <div className="sticky top-0 shrink-0 w-full max-w-72 flex flex-col">
        <div className="w-full sticky top-0">
          <RightMenuApp />
        </div>
      </div>
    </div>
  );
}
