"use client";
import { useStore } from "@/lib/store/index.store";
import { ProfilInfosInAppType } from "@/lib/store/profilInfosInApp.slice";
import { upperFirstLetterOfAString } from "@/lib/utils/scriptJS/upperCaseFirstLetter";
import { useEffect } from "react";

const ProfileInitializer = ({ session }) => {
  // ZUSTAND: on place les infos de session dans le store pour qu'elles soient accessibles partout dans l'app
  const updateProfile = useStore((state) => state.updateProfile);

  useEffect(() => {
    if (session) {
      const profileInfos: Omit<ProfilInfosInAppType, "updateProfile"> = {
        userId: session?.user.id,
        displayName: upperFirstLetterOfAString(session?.user?.displayName),
        username: session?.user?.username,
        image: session?.user?.image,
      };
      updateProfile(profileInfos);
    }
  }, [session, updateProfile]);

  return null;
};

export default ProfileInitializer;
