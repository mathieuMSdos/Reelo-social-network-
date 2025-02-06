import Image from "next/image";

interface AvatarLpPropsType {
  imgSrc: string;
  imgAlt: string;
}

const AvatarLp = ({ imgSrc, imgAlt }: AvatarLpPropsType) => {
  return (
    <div className="h-14 w-14 rounded-full">
      <Image
        className="rounded-full"
        src={imgSrc}
        alt={imgAlt}
        width={80}
        height={80}
      />
    </div>
  );
};

export default AvatarLp;
