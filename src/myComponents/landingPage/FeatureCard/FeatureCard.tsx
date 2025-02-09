import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "../../UI/3d-card";
import BgFlickering from "../../UI/background/bgFlickering/BgFlickering";
import SecondaryButton from "../../UI/secondaryButton/SecondaryButton";

const FeatureCard = () => {
  const contentArray = [
    {
      title: "AI-Powered Reality Check",
      description:
        "Leverage our cutting-edge AI technology to instantly verify and authenticate real estate listings. Reello's smart algorithms analyze thousands of data points to ensure you're getting genuine, high-quality property opportunities.",
      textButton: "Learn more →",
      imageHref: "abstract_(1).png",
    },
    {
      title: "Smart Portfolio Tracking",
      description:
        "Keep your real estate investments organized and optimized with our intelligent portfolio management system. Track performance metrics, receive market insights, and get personalized recommendations all in one seamless dashboard.",
      textButton: "Learn more →",
      imageHref: "abstract_(2).png",
    },
    {
      title: "Instant Market Analysis",
      description:
        "Make data-driven decisions with our real-time market analysis tool. Get comprehensive reports on property values, neighborhood trends, and investment potential within seconds. Stay ahead of the market with Reello's predictive insights.",
      textButton: "Learn more →",
      imageHref: "abstract_(3).png",
    },
  ];

  return (
    <>
      <div className="relative w-full h-fit overflow-hidden py-7 px-2">
        <BgFlickering />
        <div className="w-full px-2 flex flex-col">
          {/* title section */}

          <div className="w-full text-darkLine/90 flex flex-col gap-8 text-center ">
            <h2 className="text-3xl font-extrabold lg:text-6xl">
              What makes Reello unique?
            </h2>
            <p className="text-balance text-muted-foreground lg:text-lg">
              Our AI-powered technology ensures accuracy and reliability.
            </p>
          </div>
          <div className="flex flex-col md:gap-4 md:flex-row">
            {contentArray.map((card, index) => (
              <div key={index} className="w-full">
                <CardContainer containerClassName=" py-8 md:py-20 h-full mx-2 ">
                  <CardBody className="bg-white relative group/card rounded-xl border border-black/[0.1] hover:border-black/[0.2] px-8 py-14 flex flex-col h-full bg-gradient-to-bl from-greyPurple/60 to-slate-white  ">
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
                      {/* <button className="px-4 py-2 rounded-xl bg-black text-white text-sm">
                    {card.textButton}
                  </button> */}
                      {/* <PrimaryButton text={card.textButton} className="mt-4" /> */}
                      <SecondaryButton
                        text={card.textButton}
                        className="mt-4 group-hover/card:shadow-md"
                      />
                    </CardItem>
                    <div className="flex justify-center">
                      <CardItem translateZ={100} className="mt-6">
                        <Image
                          src={`/assetLp/features/${card.imageHref}`}
                          height={100}
                          width={100}
                          priority={index === 0}
                          className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                          alt="thumbnail"
                          loading={index === 0 ? "eager" : "lazy"}
                          />
                      </CardItem>
                    </div>
                  </CardBody>
                </CardContainer>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FeatureCard;
