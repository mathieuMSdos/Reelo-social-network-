"use client"
import { useStore } from '@/lib/store/index.store';
import RightMenuApp from '@/src/components/leftMenuApp/rightMenuApp/RightMenuApp';
import ProfileBanner from '@/src/components/profileBanner/ProfileBanner';
import PrimaryButton from '@/src/components/UI/primaryButton/PrimaryButton';
import React from 'react';


const page = () => {

  // ZUSTAND -
  const resultProfile = useStore((state)=> state.resultProfile)


  return (
    <div className="w-full flex gap-20 justify-between min-h-screen ">
    <div className=" w-full min-w-56 max-w-screen-xl">
      <ProfileBanner data={resultProfile}/>
      {/* <FeedPostColumn /> */}
    </div>
    <div className="w-full max-w-64 bg-purple-100">
      <RightMenuApp/>
    </div>
  </div>
);

};

export default page;