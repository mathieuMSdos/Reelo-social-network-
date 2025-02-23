import { LoaderCircle } from "@/src/myComponents/UI/LoaderCircle/LoaderCircle";

const loading = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <LoaderCircle />
    </div>
  );
};

export default loading;
