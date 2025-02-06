import { Star } from "lucide-react";
import WrapperButtonSpecial from "../../UI/primaryButton/WrapperButtonSpecial";
import AvatarLp from "./AvatarLp";

interface Hero7Props {
  heading?: string;
  description?: string;
  button?: {
    text: string;
    url: string;
  };
  reviews?: {
    count: number;
    avatars: {
      src: string;
      alt: string;
    }[];
  };
}

const Hero7 = ({
  heading = "Share Authentic Moments in a World of Filters",
  description = "Jump into a beautifully designed social experience where sharing feels natural, connecting is instant, and every interaction flows seamlessly through our lightning-fast, minimalist interface",

  reviews = {
    count: 200,
    avatars: [
      {
        src: "/avatarLp/avatarLp (1).avif",
        alt: "Avatar 1",
      },
      {
        src: "/avatarLp/avatarLp (2).avif",
        alt: "Avatar 2",
      },
      {
        src: "/avatarLp/avatarLp (3).avif",
        alt: "Avatar 3",
      },
      {
        src: "/avatarLp/avatarLp (4).avif",
        alt: "Avatar 4",
      },
      {
        src: "/avatarLp/avatarLp (5).avif",
        alt: "Avatar 5",
      },
    ],
  },
}: Hero7Props) => {
  return (
    <section className=" mt-14 py-32">
      <div className="container text-center">
        <div className="mx-auto flex max-w-screen-lg flex-col gap-6">
          <h1 className="text-3xl font-extrabold lg:text-6xl">{heading}</h1>
          <p className="text-balance text-muted-foreground lg:text-lg">
            {description}
          </p>
        </div>
        <div className="mt-6">
          <WrapperButtonSpecial
            text="Join Reello Now"
            className="font-semibold text-xl px-6 py-3"
          ></WrapperButtonSpecial>
        </div>
        <div className="mx-auto mt-10 flex w-fit flex-col items-center gap-4 sm:flex-row">
          <span className="mx-4 inline-flex items-center -space-x-4">
            {reviews.avatars.map((avatar, index) => (
              <AvatarLp key={index} imgSrc={avatar.src} imgAlt={avatar.alt} />
            ))}
          </span>
          <div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className="size-5 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <p className="text-left font-medium text-muted-foreground">
              from {reviews.count}+ reviews
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero7 };
