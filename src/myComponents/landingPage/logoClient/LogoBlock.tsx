"use client";

import AutoScroll from "embla-carousel-auto-scroll";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";

interface Logo {
  id: string;
  description: string;
  image: string;
  className?: string;
}

interface Logos3Props {
  heading?: string;
  logos?: Logo[];
  className?: string;
}

const LogoBlock = ({
  heading = "Trusted by these companies",
  logos = [
    {
      id: "logo-1",
      description: "Logo 1",
      image: "/assetLp/logoPartner/astro.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-2",
      description: "Logo 2",
      image: "/assetLp/logoPartner/figma.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-3",
      description: "Logo 3",
      image: "/assetLp/logoPartner/nextjs.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-4",
      description: "Logo 4",
      image: "/assetLp/logoPartner/react.png",
      className: "h-7 w-auto",
    },
    {
      id: "logo-5",
      description: "Logo 5",
      image: "/assetLp/logoPartner/shadcn-ui.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-6",
      description: "Logo 6",
      image: "/assetLp/logoPartner/supabase.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-7",
      description: "Logo 7",
      image: "/assetLp/logoPartner/tailwind.svg",
      className: "h-4 w-auto",
    },
    {
      id: "logo-8",
      description: "Logo 8",
      image: "/assetLp/logoPartner/vercel.svg",
      className: "h-7 w-auto",
    },
  ],
}: Logos3Props) => {
  return (
    <section className="pb-20 text-darkLine/90  bg-backgrounfLight flex flex-col gap-10 ">
      <div className="w-full text-darkLine/90 flex flex-col gap-8 text-center ">
        <h2 className="text-3xl font-extrabold lg:text-6xl">{heading}</h2>
      </div>
      <div className="pt-10 md:pt-16 lg:pt-20">
        <div className="relative mx-auto flex items-center justify-center lg:max-w-5xl">
          <Carousel
            opts={{ loop: true }}
            plugins={[AutoScroll({ playOnInit: true, speed: 1 })]}
          >
            <CarouselContent className="ml-0">
              {logos.map((logo) => (
                <CarouselItem
                  key={logo.id}
                  className="flex basis-1/3 justify-center pl-0 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
                >
                  <div className="mx-8 flex shrink-0 items-center justify-center">
                    <div>
                      <Image
                        src={logo.image}
                        alt={logo.description}
                        className={logo.className}
                        width={150}
                        height={150}
                        loading="lazy"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background to-transparent"></div>
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export { LogoBlock };
