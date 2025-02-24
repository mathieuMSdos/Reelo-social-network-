"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

interface LoginProps {
  heading?: string;
  subheading?: string;
  googleText?: string;
  signUpText?: string;
  signUpUrl?: string;
}

const Login = ({
  heading = "Log in",
  subheading = "Log in to your account",
  googleText = "Continue with Google",
  signUpText = "Already have an account?",
  signUpUrl = "#",
}: LoginProps) => {
  return (
    <div className="container">
      <div className="flex flex-col gap-4">
        <div className="mx-auto w-full max-w-sm rounded-md p-6 shadow">
          <div className="mb-6 flex flex-col items-center">
            <Image
              src="/logo/Logo_no_text.png"
              alt="logo_reelo"
              className="mb-7 h-14 w-auto "
              width={50}
              height={50}
            />
            <p className="mb-2 text-2xl font-bold">{heading}</p>
            <p className="text-muted-foreground">{subheading}</p>
          </div>
          <div>
            <div className="grid gap-4">
              <Button
                variant="outline"
                className="w-full flex gap-2 justify-center items-center"
                onClick={async () => await signIn("google")}
                 aria-label="Continue with Google"
              >
                <span>
                  <Image
                    src="/icons/google96.png"
                    alt="google_icon"
                    className="h-5 w-auto"
                    width={18}
                    height={18}
                  />
                </span>
                {googleText}
              </Button>
              {/* <Input type="email" placeholder="Enter your email" required disabled />
                <div>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    required
                    disabled
                  />
                </div>
                <Button type="submit" className="mt-2 w-full" disabled>
                  {signupText}
                </Button> */}
            </div>
            <div className="mx-auto mt-8 flex justify-center gap-1 text-sm text-muted-foreground">
              <p>{signUpText}</p>
              <Link href={signUpUrl} className="font-bold text-darkLine">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Login };
