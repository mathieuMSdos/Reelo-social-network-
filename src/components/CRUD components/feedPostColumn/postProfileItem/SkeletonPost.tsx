import BentoContainer from "../../../bentoContainer/BentoContainer";


const SkeletonPost = () => {
  return (
    <BentoContainer className="w-full h-fit rounded-xl py-8 px-10 ">
      <div className="w-full h-fit animate-pulse ">
        {/* Container principal qui doit prendre toute la largeur */}
        <div className="w-full flex flex-col gap-4">
          {/* En-tête avec avatar */}
          <div className="w-full flex items-center gap-4">
            {/* Avatar */}
            <div className="h-14 w-14 shrink-0 bg-skeletonGrey rounded-full" />
            {/* Infos utilisateur */}
            <div className="flex flex-col gap-2 w-full">
              <div className="h-4 w-32 bg-skeletonGrey rounded-lg" />
              <div className="h-3 w-24 bg-skeletonGrey rounded-lg" />
            </div>
          </div>

          {/* Corps du post */}
          <div className="w-full flex flex-col gap-3">
          <div className="w-full flex flex-col gap-3">
              <div className="h-4 w-full bg-skeletonGrey rounded-lg" />
              <div className="h-4 w-3/4 bg-skeletonGrey rounded-lg" />
              <div className="h-4 w-1/2 bg-skeletonGrey rounded-lg" />
            </div>
          </div>
          <div className="h-80 w-full bg-skeletonGrey rounded-lg" />
        </div>
      </div>
    </BentoContainer>
  );
};

export default SkeletonPost;
