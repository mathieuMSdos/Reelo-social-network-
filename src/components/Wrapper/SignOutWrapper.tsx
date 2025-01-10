"use client";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import SecondaryButtonInApp from "../UI/secondaryButtonInApp/SecondaryButtonInApp";

const SignOutButtonWrapper = () => {
  return (
    <SecondaryButtonInApp className="text-xs max-h-8 px-3 py-2" text="Sign out" onClick={() => signOut()}>
      <LogOut className="text-purpleBtn" size={16} strokeWidth={2.5} />
    </SecondaryButtonInApp>
  );
};

export default SignOutButtonWrapper;
