import { SignUp } from "@/src/myComponents/connexion/signUp/SignUp";

const signUpPage = () => {
  return (
    <section className=" w-full h-screen flex items-center text-darkLine">
      <div className="w-full h-fit">
        <SignUp />
      </div>
    </section>
  );
};

export default signUpPage;
