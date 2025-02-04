"use client";
import { followAction } from "@/app/actions/socialActions/FollowUnfollowUser/following.actions";
import { unfollowAction } from "@/app/actions/socialActions/FollowUnfollowUser/unfollow.actions";
import { useStore } from "@/lib/store/index.store";
import PrimaryButton from "@/src/components/UI/primaryButton/PrimaryButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface DataFollowType {
  userId: string;
  userFollowedID: string;
}

const WrapperFollowUnffolowButton = ({ profileSuggested }) => {
  const { id: userFollowedID, username: profileUsername } = profileSuggested;
  //ZUSTAND info du profil user connecté
  const userId = useStore((state) => state.userId);

  //TANSTACK ini queryclient
  const queryClient = useQueryClient();

  // TANSTACK follow action + optimistic update

  const {
    mutate: followMutation,
    isPending: followIsPending,
    error: followError,
  } = useMutation({
    mutationFn: ({ userId, userFollowedID }: DataFollowType) =>
      followAction(userId, userFollowedID),
    onMutate: async () => {
      // Annuler les requêtes en cours
      await queryClient.cancelQueries({
        queryKey: ["userProfile", profileUsername],
      });
      // Snapshot de l'état actuel
      const previousProfile = queryClient.getQueryData([
        "userProfile",
        profileUsername,
      ]);
      // ZUSTAND Snaptshort compteur follower zustand
      const previousFollowingCount = useStore.getState().followingCount;

      // Optimistic update
      // ZUSTAND mise à jour du compteur followingCount
      useStore.getState().updateProfile({
        followingCount: useStore.getState().followingCount + 1,
      });
      // mise à jour du cache tanstastck
      queryClient.setQueryData(
        ["userProfile", profileUsername],
        (currentData: {
          data: UserPublicDataType & { alreadyFollowed: boolean };
        }) => ({
          data: {
            ...currentData.data,
            followedByCount: currentData.data.followedByCount + 1,
            alreadyFollowed: true,
          },
        })
      );
      return { previousProfile, previousFollowingCount };
    },
    onSuccess: (response) => {
      console.log(response);
      queryClient.invalidateQueries({
        queryKey: ["userProfile", profileUsername],
      });
    },
    onError: (error, _, context) => {
      console.log(error);
      //ZUSTAND Rollback vers previousFollowingCount
      useStore.getState().updateProfile({
        followingCount: context?.previousFollowingCount,
      });

      // Rollback en cas d'erreur
      queryClient.setQueryData(
        ["userProfile", profileUsername],
        context?.previousProfile
      );
    },
    onSettled: () => {
      // Rafraîchir les données
      queryClient.invalidateQueries({
        queryKey: ["userProfile", profileUsername],
      });
    },
  });

  // TANSTACK Unfollow action
  const {
    mutate: unfollowMutation,
    isPending: unfollowPending,
    error: unfollowError,
  } = useMutation({
    mutationFn: ({ userId, userFollowedID }: DataFollowType) =>
      unfollowAction(userId, userFollowedID),
    onMutate: async () => {
      // Annuler les requête en cours
      await queryClient.cancelQueries({
        queryKey: ["userProfile", profileUsername],
      });
      // Snapshot de l'état précédent
      const previousProfile = queryClient.getQueryData([
        "userProfile",
        profileUsername,
      ]);

      //ZUSTAND snapshot de l'état précédent
      const previousFollowingCount = useStore.getState().followingCount;

      // Optimistic update
      // ZUSTAND mise à jour du compteur followingCount
      useStore.getState().updateProfile({
        followingCount: useStore.getState().followingCount - 1,
      });

      queryClient.setQueryData(
        ["userProfile", profileUsername],
        (currentData: {
          data: UserPublicDataType & { alreadyFollowed: boolean };
        }) => ({
          data: {
            ...currentData.data,
            followedByCount: currentData.data.followedByCount - 1,
            alreadyFollowed: false,
          },
        })
      );
      return { previousProfile, previousFollowingCount };
    },
    onSuccess: (response) => {
      console.log(response);
      // invalider le cache pour refetch
      queryClient.invalidateQueries({
        queryKey: [["userProfile", profileUsername], ["userSession"]],
      });
    },
    onError: (error, _, context) => {
      console.log(error);
      //ZUSTAND Rollback vers previousFollowingCount
      useStore.getState().updateProfile({
        followingCount: context?.previousFollowingCount,
      });

      // Rollback en cas d'erreur
      queryClient.setQueryData(
        ["userProfile", profileUsername],
        context?.previousProfile
      );
    },
    onSettled: () => {
      // Rafraîchir les données
      queryClient.invalidateQueries({
        queryKey: ["userProfile", profileUsername],
      });
    },
  });

  return (
    <div>
      <PrimaryButton className="h-8 py-0 px-4" text="Follow" />
    </div>
  );
};

export default WrapperFollowUnffolowButton;
