import PostItem from "./PostItem";

const FeedPostColumn = () => {
  return (
    <div className="flex flex-col gap-1 items-center justify-start w-full h-auto min-h-screen ">
      {/* header */}
      <div className="flex justify-between w-full">
      <h3 className="text-left">Your Post</h3>

      </div>
      <PostItem />
    </div>
  );
};

export default FeedPostColumn;
