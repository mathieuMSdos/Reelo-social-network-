import FeedPostColumn from "@/src/components/CRUD components/feedPostColumn/feedPostColumn";
import LeftMenuApp from "@/src/components/leftMenuApp/LeftMenuApp";

const page = () => {
  return (
    <div className="relative w-full h-auto flex justify-between gap-3">
      <div className="fixed h-screen w-1/6 min-w-48">
        <LeftMenuApp />
      </div>
      {/* Add a placeholder div to maintain space */}
      <div className="invisible w-2/6 min-w-48" />
      <div className="h-4/5 w-full">
        <FeedPostColumn />
      </div>
      <div className="h-auto hidden md:flex w-2/6 min-w-48 bg-red-100" />
    </div>
  );
};

export default page;
