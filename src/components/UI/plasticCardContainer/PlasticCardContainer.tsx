import { ReactNode } from "react";
interface PlasticCardContainerPropsType {
  children: ReactNode;
  className1?:string,
  className2?:string,
}

const PlasticCardContainer = ({ children, className1, className2 }: PlasticCardContainerPropsType) => {
  return (
    // Contour card
    <div className={` h-fit w-2/5 bg-white/20 backdrop-blur-md rounded-2xl border p-3 ${className1} `}>
      {/* card */}
      <div className={`h-fit w-full flex flex-col gap-4 items-center px-4 py-4 bg-white border rounded-2xl ${className2}`}>
        {children}
      </div>
    </div>
  );
};

export default PlasticCardContainer;
