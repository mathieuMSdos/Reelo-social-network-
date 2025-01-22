import FeedPostColumn from "@/src/components/CRUD components/feedPostColumn/feedPostColumn";
import RightMenuApp from "@/src/components/leftMenuApp/rightMenuApp/RightMenuApp";

const page = () => {
  return (
    <div className="w-full flex gap-20 justify-between min-h-screen ">
      <div className=" w-full min-w-56 max-w-screen-xl">
        <FeedPostColumn />
      </div>
      <div className="w-full max-w-64 bg-purple-100">
        <RightMenuApp/>
      </div>
    </div>
  );
};

export default page;
