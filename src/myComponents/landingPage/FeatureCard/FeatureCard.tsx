import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "../../UI/3d-card";
import FlickeringWrapper from "../../UI/background/Flickering-grid/FlickeringWrapper";

const FeatureCard = () => {
  const contentArray = [
    {
      title: "Titre de la feature",
      description:
        "Description de votre feature qui explique son utilité et ses avantages.",
      textButton: "En savoir plus →",
      imageHref: "./creative.avif",
    },
    {
      title: "Titre de la feature",
      description:
        "Description de votre feature qui explique son utilité et ses avantages.",
      textButton: "En savoir plus →",
      imageHref: "./diversity.avif",
    },
    {
      title: "Titre de la feature",
      description:
        "Description de votre feature qui explique son utilité et ses avantages.",
      textButton: "En savoir plus →",
      imageHref: "./fastest.avif",
    },
  ];

  return (
    <>
      <div className="relative w-full h-fit flex flex-col gap-4 md:flex-row overflow-hidden">
        <FlickeringWrapper className="opacity-80" />

        {contentArray.map((card, index) => (
          <div key={index} className="w-full">
            <CardContainer containerClassName="py-20 h-full">
              <CardBody className="bg-white relative group/card rounded-xl border border-black/[0.1] hover:border-black/[0.2] px-8 py-14 flex flex-col h-full">
                <CardItem
                  translateZ={50}
                  className="text-xl font-bold text-neutral-800"
                >
                  {card.title}
                </CardItem>
                <CardItem translateZ={30} className="text-neutral-500 mt-4">
                  {card.description}
                </CardItem>
                <CardItem translateZ={80} className="mt-8">
                  <button className="px-4 py-2 rounded-xl bg-black text-white text-sm">
                    {card.textButton}
                  </button>
                </CardItem>
                <CardItem translateZ={100} className="mt-6">
                  <Image
                    src="/assetLp/features/creative.avif"
                    height="1000"
                    width="1000"
                    className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    alt="thumbnail"
                  />
                </CardItem>
              </CardBody>
            </CardContainer>
          </div>
        ))}
      </div>
    </>
  );
};

export default FeatureCard;
