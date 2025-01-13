"use client";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import SecondaryButtonInApp from "../UI/secondaryButtonInApp/SecondaryButtonInApp";

const SignOutButtonWrapper = () => {
  return (
    <SecondaryButtonInApp className="max-h-auto px-3 py-2 text-sm" text="Sign out" onClick={() => signOut()}>
      <LogOut className="text-purpleBtn" size={20} strokeWidth={2.5} />
    </SecondaryButtonInApp>
  );
};

export default SignOutButtonWrapper;
