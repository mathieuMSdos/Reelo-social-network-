import FeedPostColumn from "@/src/components/CRUD components/feedPostColumn/feedPostColumn";

const page = () => {
  return (
    <div className="w-full flex gap-20 justify-between min-h-screen ">
      <div className="min-w-56 max-w-screen-xl">
        <FeedPostColumn />
      </div>
      <div className="w-full max-w-64 bg-purple-100"></div>
    </div>
  );
};

export default page;
