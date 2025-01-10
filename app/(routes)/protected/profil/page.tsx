import LeftMenuApp from "@/src/components/leftMenuApp/LeftMenuApp";

const page = () => {
  return (
    // <div className="grid grid-cols-12 gap-3">
    //   <div className="col-span-3 h-96  border bg-red-300">
    //     <LeftMenuApp className="w-full" />
    //   </div>
    //   <div className="col-span-6 h-96 border bg-red-300"></div>
    //   <div className="col-span-3 h-96 min-w-40 border bg-red-300"></div>
    // </div>

    <div className="w-ful flex justify-between gap-3">
    <div className="h-96 w-1/6 min-w-48 border bg-red-100">
      <LeftMenuApp />
    </div>
    <div className=" h-96 w-full  border bg-red-100"></div>
    <div className=" hidden md:flex h-96 w-2/6 min-w-48 border bg-red-100 "></div>
  </div>
  );
};

export default page;
