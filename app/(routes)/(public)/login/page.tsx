import { Login } from "@/src/myComponents/connexion/login/Login";

const loginPage = () => {
  return (
    <section className=" w-full h-screen flex items-center text-darkLine">
      <div className="w-full h-fit">
        <Login heading="Log in" subheading="Log in to your account" googleText="Continue with Google" signUpText="Don't have an account?" signUpUrl="/signup" />
      </div>
    </section>
  );
};



export default loginPage;
