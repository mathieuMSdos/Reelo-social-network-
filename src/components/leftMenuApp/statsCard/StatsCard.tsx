import BentoContainer from "../../bentoContainer/BentoContainer";

interface StatsCardProps {
  className?: string;
  stats: string;
  text: string;
}

const StatsCard = ({ className, stats, text }: StatsCardProps) => {
  return (
    <BentoContainer className="w-full rounded-lg ">
      <div className={`${className} flex flex-col justify-center items-center `}>
        <p className="font-bold">{stats}</p>
        <p className="text-xs text-textGrey">{text}</p>
      </div>
    </BentoContainer>
  );
};

export default StatsCard;
