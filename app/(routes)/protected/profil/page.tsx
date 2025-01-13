import LeftMenuApp from "@/src/components/leftMenuApp/LeftMenuApp";

const page = () => {
  return (
    <div className="w-full h-auto flex justify-between gap-3">
    <div className="h-auto w-1/6 min-w-48">
      <LeftMenuApp />
    </div>
    <div className=" h-auto min-h-screen  w-full  border bg-red-100"></div>
    <div className=" h-auto  hidden md:flex h-96 w-2/6 min-w-48 border bg-red-100 "></div>
  </div>
  );
};

export default page;
