import { upperFirstLetterOfAString } from "@/lib/utils/scriptJS/upperCaseFirstLetter";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import BentoContainer from "../../../bentoContainer/BentoContainer";

const PostProfileItem = ({ postData }) => {
const [showMore, setShowMore] = useState(false)

  // infos sur l'autheur du post
  const { image, displayName, username } = postData.author;

  // infos contenu du post
  const { content, imageUrl } = postData;

//  const truncatedContent = useMemo(()=>{

//   if(content.length >= 150) {
//     content.
//   }
// // faire la fonction qui va faire le showmore
//  },[content])

  return (
    <BentoContainer className="w-full h-fit rounded-xl py-8 px-10 ">
      {/* post header */}
      <div className="flex justify-start   gap-2">
        <div className=" flex-shrink-0  ">
          <Image
            className=" rounded-full object-cover"
            src={image}
            width={45}
            height={45}
            alt="profil-picture"
          />
        </div>
        {/* contenu du post */}
        <div className="flex flex-col gap-3 ">
          <div>
            <div className="flex justify-start items-center gap-2   ">
              <p className="text-sm font-bold">
                {upperFirstLetterOfAString(displayName)}
              </p>
              <p className="text-xs text-textGrey">{username}</p>
            </div>
            <p className="text-xs text-textGrey">2 hours ago</p>
          </div>

          <div>
            <div className="h-12 overflow-hidden">
              {/* texte du post */}
              <p>{upperFirstLetterOfAString(content)}</p>
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
