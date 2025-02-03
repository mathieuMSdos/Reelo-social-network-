import { ReactNode } from "react";
interface PlasticCardContainerPropsType {
  children: ReactNode;
  className1?: string;
  className2?: string;
}

const PlasticCardContainer = ({
  children,
  className1,
  className2,
}: PlasticCardContainerPropsType) => {
  return (
    // Contour card
    <div
      className={` h-fit w-2/5 bg-white/20 backdrop-blur-lg rounded-2xl shadow-md border border-white/40 p-3 ${className1} `}
    >
      {/* card */}
      <div
        className={`h-fit w-full flex flex-col gap-4 items-center px-4 py-4 bg-gradient-to-tr from-white/20 to-white/60 border border-white/60  rounded-2xl backdrop-blur-md ${className2}`}
      >
        {children}
      </div>
    </div>
  );
};

export default PlasticCardContainer;
