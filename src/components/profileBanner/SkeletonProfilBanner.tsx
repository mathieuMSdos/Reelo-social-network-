import React from 'react';
import BentoContainer from '../bentoContainer/BentoContainer';

const SkeletonProfilBanner = () => {
  return (
    <div className="w-full h-auto flex flex-col justify-start items-center gap-2">
      <BentoContainer className="w-full h-auto flex justify-between items-center p-4 overflow-hidden">
        <div className="flex justify-between items-center w-full gap-3">
          <div className="flex justify-center items-center flex-shrink-0 gap-3">
            {/* Avatar skeleton */}
            <div className="w-[50px] h-[50px] rounded-full bg-skeletonGrey animate-pulse" />
            
            {/* Name and username skeleton */}
            <div className="flex-col justify-center space-y-2">
              <div className="h-4 w-24 bg-skeletonGrey rounded-full animate-pulse" />
              <div className="h-3 w-16 bg-skeletonGrey rounded-full animate-pulse" />
            </div>
          </div>

          {/* Separator */}
          <span className="mx-2 my-1 w-px self-stretch bg-skeletonGrey"></span>

          {/* Bio skeleton */}
          <div className="w-full flex justify-center items-center flex-grow">
            <div className="h-12 w-full bg-skeletonGrey rounded-md animate-pulse" />
          </div>

          {/* Separator */}
          <span className="mx-2 my-1 w-px self-stretch bg-skeletonGrey"></span>

          {/* Button skeleton */}
          <div className="flex justify-center items-center min-w-24">
            <div className="h-9 w-24 bg-skeletonGrey rounded-md animate-pulse" />
          </div>
        </div>
      </BentoContainer>

      {/* Badges skeleton */}
      <div className="w-full h-auto flex justify-start items-center gap-3">
        {/* Followers badge skeleton */}
        <BentoContainer className="h-10 px-4  flex items-center">
          <div className="h-4 w-28 bg-skeletonGrey rounded-md animate-pulse" />
        </BentoContainer>
        
        {/* Following badge skeleton */}
        <BentoContainer className="h-10 px-4  flex items-center">
          <div className="h-4 w-28 bg-skeletonGrey rounded-md animate-pulse" />
        </BentoContainer>
        
        {/* Date badge skeleton */}
        <BentoContainer className="h-10 px-4  flex items-center">
          <div className="h-4 w-48 bg-skeletonGrey rounded-md animate-pulse" />
        </BentoContainer>
      </div>
    </div>
  );
};

export default SkeletonProfilBanner;