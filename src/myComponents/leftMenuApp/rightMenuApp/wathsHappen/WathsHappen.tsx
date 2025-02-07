import BentoContainer from "@/src/myComponents/bentoContainer/BentoContainer";
import { Ellipsis } from "lucide-react";

const WathsHappen = () => {
  const itemData = [
    { hashTag: "#Figma", postsCount: "90.2k" },
    { hashTag: "#Framer", postsCount: "43.2k" },
    { hashTag: "#Webflow", postsCount: "10.1k" },
  ];

  return (
    <BentoContainer className=" flex flex-col w-full p-4 gap-4 text-darkLine">
      <h3 className="text-lg font-bold">What’s happening</h3>
      <ul className="flex flex-col">
        {itemData.map((item) => (
          <li
            key={item.hashTag}
            className="flex justify-between items-center w-full hover:bg-greyPurple py-1 px-2 rounded-lg cursor-pointer transition-all duration-150"
          >
            <div>
              <p className="font-semibold">{item.hashTag}</p>
              <p className=" text-sm px-3 text-textGrey">
                {item.postsCount} Posts
              </p>
            </div>
            <div>
              <Ellipsis className="text-textgre" />
            </div>
          </li>
        ))}
      </ul>
    </BentoContainer>
  );
};

export default WathsHappen;
