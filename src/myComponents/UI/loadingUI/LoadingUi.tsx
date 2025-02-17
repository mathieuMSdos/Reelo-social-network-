import { Loader2 } from "lucide-react";

interface LoadingUiProps {
  text: string;
}

const LoadingUi = ({ text }: LoadingUiProps) => {
  return (
    <div className="flex gap-2 items-center text-textGrey">
      <Loader2 className="animate-spin h-7 w-7" />
      <p>{text}</p>
    </div>
  );
};

export default LoadingUi;
