"use client";
import { signIn } from "next-auth/react";
import PrimaryButtonSpecial from "./PrimaryButtonSpecial";

interface WrapperButtonSpecialProps {
  text: string;
  className: string;
}

const WrapperButtonSpecial = ({
  text,
  className,
}: WrapperButtonSpecialProps) => {
  return (
    <PrimaryButtonSpecial
      text={text}
      onClick={async () => await signIn("google")}
      className={className}
    ></PrimaryButtonSpecial>
  );
};

export default WrapperButtonSpecial;
