"use client";
import { likePostAction } from "@/app/actions/socialActions/likePost.action";
import { useStore } from "@/lib/store/index.store";
import { useMutation } from "@tanstack/react-query";
import { Heart } from "lucide-react";

interface PostLikeButtonPropsType {
  authorId: string;
  idPost: string;
  likeCount: number;
}

const PostLikeButton = ({
  authorId,
  idPost,
  likeCount,
}: PostLikeButtonPropsType) => {
  // ZUSTAND userID
  const userId = useStore((state) => state.userId);


  // TANSTACK
  const {
    mutate: likeMutation,
    isPending: LikeIsPending,
    error: LikeError,
  } = useMutation({
    mutationFn: async ({ userId, idPost, authorId }) => {
      likePostAction(userId, idPost,authorId);
    },
    onMutate: async () => {},
    onSuccess: async () => {},
    onError: async () => {},
  });

  return (
    <button
      className="flex gap-1 items-center justify-center"
      onClick={ () => {
        likeMutation({ userId, idPost, authorId });
      }}
    >
      <Heart className="text-textGrey" fill="currentColor" size={20} />
      <p className=" text-textGrey font-bold">{likeCount}</p>
    </button>
  );
};

export default PostLikeButton;
