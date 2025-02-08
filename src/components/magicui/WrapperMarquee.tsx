"use client";
import { DotPattern } from "./DotPattern";
import { Marquee } from "./marquee";
import { ReviewCard } from "./ReviewCart";

const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "/assetLp/reviews/reviews_(1).jpeg",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "/assetLp/reviews/reviews_(2).jpeg",
  },
  {
    name: "Emilia",
    username: "@Emilia",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "/assetLp/reviews/reviews_(3).jpeg",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "/assetLp/reviews/reviews_(4).jpeg",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "/assetLp/reviews/reviews_(5).jpeg",
  },
  {
    name: "James",
    username: "@james",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "/assetLp/reviews/reviews_(6).jpeg",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

export function WrapperMarquee() {
  return (
    <div className="relative flex h-[600px] w-full flex-col gap-8 items-center justify-center overflow-hidden rounded-lg bg-backgrounfLight md:shadow-xl">
      <div className="w-full text-darkLine/90 flex flex-col gap-8 text-center">
        <h2 className="text-3xl font-extrabold lg:text-6xl">
          Join 1M+ happy users
        </h2>
        <p className="text-balance text-muted-foreground lg:text-lg">
          See why people can&apos;t stop talking about reello
        </p>
      </div>
      {/* background */}
      <DotPattern />

      <Marquee pauseOnHover className="[--duration:20s] text-darkLine">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>

      <Marquee
        reverse
        pauseOnHover
        className="[--duration:20s] text-darkLine bgred"
      >
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>

      {/* Les gradients latéraux  */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}
