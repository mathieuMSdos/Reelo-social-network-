import BentoContainer from "../bentoContainer/BentoContainer";

interface BadgeCounterPropsType {
  text: string;
  counter: number;
}

const BadgeCounter = ({ text, counter }: BadgeCounterPropsType) => {
  return (
    <BentoContainer className="flex justify-center items-center gap-1 px-3 py-2 ">
      <p className=" font-bold">{counter}</p>
      <p className="text-textGrey">{text}</p>
    </BentoContainer>
  );
};

export default BadgeCounter;
