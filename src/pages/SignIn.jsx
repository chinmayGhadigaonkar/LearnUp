import {
  RedirectToSignIn,
  SignIn,
  SignInButton,
  SignUp,
} from "@clerk/clerk-react";
import React from "react";

const SignInPage = () => {
  return (
    <div className="mx-auto flex-1 py-28">
      <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up"></SignIn>
    </div>
  );
};

export default SignInPage;
