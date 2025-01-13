"use client";

import SecondaryButtonInApp from "../../UI/secondaryButtonInApp/SecondaryButtonInApp";

const CreatePostModal = () => {
  return (
    // le background gradient etc;; sera à mettre ici
    <div className="fixed inset-0 w-full min-h-screen flex justify-center items-center bg-white/30 backdrop-blur-sm text-backGroundDark ">
      {/* contour */}
      <div className="h-2/5 w-1/2 bg-white/20 backdrop-blur-md rounded-xl border p-3">
        {/* card */}
        <div className=" h-full w-full flex flex-col items-center px-4 py-3 bg-white p border rounded-xl ">
          {/* close button */}
          <div className="flex justify-end w-full  ">
            <SecondaryButtonInApp className="bg-red-400 rounded-md px-3 py-1" text="X" onClick={()=> console.log("close")}/>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
