"use client";
import { useStore } from "@/lib/store/index.store";
import StatsCard from "./StatsCard";

const StatsCardWrapper = () => {
  const followedByCount = useStore((state) => state.followedByCount);
  const followingCount = useStore((state) => state.followingCount);

  return (
    <div className="w-full flex justify-center items-center gap-2">
      <StatsCard
        className="w-full py-2"
        stats={followedByCount}
        text="Followers"
      />
      <StatsCard
        className="w-full py-2"
        stats={followingCount}
        text="Following"
      />
    </div>
  );
};

export default StatsCardWrapper;
