import RightMenuApp from "@/src/components/leftMenuApp/rightMenuApp/RightMenuApp";


export default async function Home() {
  return (
    <div className="w-full flex gap-20 justify-between min-h-screen  ">
              <div className=" flex flex-col gap-10 w-full min-w-56 max-w-screen-xl ">
              </div>
              <div className="w-full max-w-64 bg-purple-100">
                <RightMenuApp />
              </div>
            </div>
  );
};

