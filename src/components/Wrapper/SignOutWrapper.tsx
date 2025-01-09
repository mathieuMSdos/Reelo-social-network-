"use client";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import SecondaryButtonInApp from "../UI/secondaryButtonInApp/SecondaryButtonInApp";

const SignOutButtonWrapper = () => {
  return (
    <SecondaryButtonInApp text="Sign out" onClick={() => signOut()}>
      <LogOut size={16} strokeWidth={2.5} color="var(--purpleBtn)" />
    </SecondaryButtonInApp>
  );
};

export default SignOutButtonWrapper;
