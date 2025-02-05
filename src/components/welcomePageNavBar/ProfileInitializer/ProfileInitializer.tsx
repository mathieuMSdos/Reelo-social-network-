"use client";
import { useStore } from "@/lib/store/index.store";
import { ProfilInfosInAppType } from "@/lib/store/profilInfosInApp.slice";
import { upperFirstLetterOfAString } from "@/lib/utils/scriptJS/upperCaseFirstLetter";
import { Session } from "next-auth"; // Importez le type Session de next-auth
import { useEffect } from "react";

const ProfileInitializer = ({ session }: { session: Session | null }) => {
  const updateProfile = useStore((state) => state.updateProfile);

  useEffect(() => {
    if (session) {
      const profileInfos: Omit<ProfilInfosInAppType, "updateProfile"> = {
        userId: session.user.id,
        displayName: upperFirstLetterOfAString(session.user.displayName),
        username: session.user.username,
        image: session.user.image,
        followedByCount: session.user.followedByCount,
        followingCount: session.user.followingCount,
      };

      updateProfile(profileInfos);
    }
  }, [session, updateProfile]);

  return null;
};

export default ProfileInitializer;