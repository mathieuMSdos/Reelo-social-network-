const SkeletonWhoToFollow = () => {
  return (
      <div className="flex justify-start items-center gap-2 w-full">
        <div className="h-10 w-12 bg-skeletonGrey  animate-pulse rounded-full"></div>
        <div className="h-10 w-full bg-skeletonGrey rounded-lg animate-pulse"></div>
    </div>
  );
};

export default SkeletonWhoToFollow;
