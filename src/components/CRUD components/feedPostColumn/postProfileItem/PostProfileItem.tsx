import { dateFormat } from "@/lib/utils/scriptJS/dateFormatter";
import { upperFirstLetterOfAString } from "@/lib/utils/scriptJS/upperCaseFirstLetter";
import TertiaryButton from "@/src/components/UI/tertiaryButton/TertiaryButton";
import Image from "next/image";
import { useMemo, useState } from "react";
import BentoContainer from "../../../bentoContainer/BentoContainer";
import ThreeDots from "@/src/components/UI/threeDot/ThreeDots";

const PostProfileItem = ({ postData }) => {
  const [showMore, setShowMore] = useState(false);

  // infos sur l'autheur du post
  const { image, displayName, username } = postData.author;

  // infos contenu du post
  const { content, imageUrl, createdAt } = postData;

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

  const dateOfPorst = useMemo(() => {
    return dateFormat(createdAt);
  }, [createdAt]);

  return (
    <BentoContainer className="w-full h-fit rounded-xl py-8 px-10  ">
      {/* post header */}
      <div className="flex justify-start gap-2 ">
        <div className=" flex-shrink-0  ">
          <Image
            className=" rounded-full object-cover"
            src={image}
            width={45}
            height={45}
            alt="profil-picture"
          />
        </div>
        <div className=" h-auto w-full flex flex-col gap-3  ">
          {/* header du post */}
          <div className=" h-auto w-full flex justify-between items-start">
            <div className="h-auto">
              <div className="flex justify-start items-center gap-2   ">
                <p className="text-sm font-bold">
                  {upperFirstLetterOfAString(displayName)}
                </p>
                <p className="text-xs text-textGrey">{username}</p>
              </div>
              <p className="text-xs text-textGrey">{dateOfPorst}</p>
            </div>
           <ThreeDots/>
          </div>

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
                  className="rounded-md w-3/5 h-auto object-contain"
                  src={imageUrl}
                  width={1200}
                  height={1200}
                  priority={false}
                  alt="post-picture"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </BentoContainer>
  );
};

export default PostProfileItem;
