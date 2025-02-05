import { dateFormat } from "@/lib/utils/scriptJS/dateFormatter";
import { upperFirstLetterOfAString } from "@/lib/utils/scriptJS/upperCaseFirstLetter";
import TertiaryButton from "@/src/components/UI/tertiaryButton/TertiaryButton";
import ThreeDots from "@/src/components/UI/threeDot/ThreeDots";
import Image from "next/image";
import { useMemo, useState } from "react";
import BentoContainer from "../../../bentoContainer/BentoContainer";
import PostLikeButton from "./postLikeButton/PostLikeButton";

interface PostData {
  author: {
    id: string;
    image: string | null;
    displayName: string;
    username: string | null;
  };
  id: string;
  content: string;
  imageUrl?: string | null;
  createdAt: Date;
  likeCount: number;
  userAlreadyLikeThisPost: boolean;
}

const PostProfileItem = ({ postData }: { postData: PostData }) => {
  const [showMore, setShowMore] = useState(false);

  // infos sur l'autheur du post
  const { id: authorId, image, displayName, username } = postData.author;

  // infos contenu du post
  const {
    id,
    content,
    imageUrl,
    createdAt,
    likeCount,
    userAlreadyLikeThisPost,
  } = postData;

  const truncatedContent = useMemo(() => {
    if (content.length > 120) {
      const truncatedString = content.substring(0, 100).padEnd(103, "...");
      return upperFirstLetterOfAString(truncatedString);
    } else {
      return null;
    }
    // faire la fonction qui va faire le showmore
  }, [content]);

  // formater la date de création du post

  const dateOfPost = useMemo(() => {
    return dateFormat(createdAt);
  }, [createdAt]);

  return (
    <BentoContainer className="w-full h-fit rounded-xl py-8 px-10  ">
      {/* post header */}
      <div className="flex flex-col justify-start gap-10 ">
        {/* profile photo */}
        <div className="flex gap-3 items-center">
          <div className=" flex-shrink-0  ">
            <Image
              className=" rounded-full object-cover"
              src={image ?? "/default-avatar.png"}
              width={50}
              height={50}
              alt="profil-picture"
            />
          </div>
          <div className=" h-auto w-full flex flex-col gap-3  ">
            {/* header du post */}
            <div className=" h-auto w-full flex justify-between items-start">
              <div className="h-auto">
                <div className="flex justify-start items-center gap-2   ">
                  <p className="text font-bold">
                    {upperFirstLetterOfAString(displayName)}
                  </p>
                  <span className=" my-1 w-px self-stretch bg-skeletonGrey"></span>

                  <p className="text-xs text-textGrey">{username}</p>
                </div>
                <p className="text-xs text-textGrey">{dateOfPost}</p>
              </div>
              <ThreeDots />
            </div>
          </div>
        </div>
        {/* contenu du post */}
        <div>
          <div className="h-auto w-full bgyel">
            {/* texte du post */}
            {showMore ? (
              <p>{content}</p>
            ) : (
              <>
                <p>
                  {truncatedContent
                    ? upperFirstLetterOfAString(truncatedContent)
                    : upperFirstLetterOfAString(content)}
                </p>
                {truncatedContent && (
                  <TertiaryButton
                    className="px-0 py-0"
                    text="Voir plus"
                    onClick={() => {
                      setShowMore(true);
                    }}
                  ></TertiaryButton>
                )}
              </>
            )}

            {/* image du post */}
          </div>
          {imageUrl && (
            <div className="h-auto w-full flex justify-start mt-4 ">
              <Image
                className="rounded-md w-3/5 h-auto object-contain border border-greyPurple"
                src={imageUrl}
                width={1200}
                height={1200}
                priority={false}
                alt="post-picture"
              />
            </div>
          )}
        </div>
        {/* footer post */}
        <div className="flex items-center justify-start gap-8">
          <PostLikeButton
            authorId={authorId}
            idPost={id}
            likeCount={likeCount}
            userAlreadyLikeThisPost={userAlreadyLikeThisPost}
          />
        </div>
      </div>
    </BentoContainer>
  );
};

export default PostProfileItem;
