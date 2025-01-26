import { useMemo } from "react";
import BentoContainer from "../bentoContainer/BentoContainer";

interface BadgeDatePropsType {
  text: string;
  date: Date;
}

const BadgeDate = ({ text, date }: BadgeDatePropsType) => {
  const formattedDate = useMemo(() => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [date]);

  return (
    <BentoContainer className="flex justify-center items-center gap-1 px-3 py-2 ">
      <p className="text-textGrey">{text} {formattedDate}</p>
    </BentoContainer>
  );
};

export default BadgeDate;
