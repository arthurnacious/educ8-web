import LoginForm from "@/features/login/components/form";
import React from "react";

function Page() {
  return (
    <div className="w-full max-w-md space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-white">
          Welcome back
        </h1>
        <p className="text-lg text-gray-400">Sign in to your account</p>
      </div>
      <LoginForm />
    </div>
  );
}

export default Page;
