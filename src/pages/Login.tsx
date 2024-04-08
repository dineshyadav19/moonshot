import Link from "next/link";
import React from "react";
import { api } from "~/utils/api";

const Login = () => {
  const loginUser = api.post.login.useMutation();
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");
    console.log({ email, password });
    const body = {} as unknown;
    for (const [key, value] of form.entries()) {
      body[key] = value;
    }
    loginUser.mutate(body);
    console.log(body);
    // Do Further input validation and submit the form
  }
  return (
    <div className="rounded-[20px] border border-brand-neutral-400 p-5 md:p-10">
      <div className="text-center">
        <p className="mb-4 text-3.5xl font-semibold">Login</p>

        <h1 className="text-2xl font-medium">Welcome back to ECOMMERCE</h1>
        <h2 className="text-base">The next gen business marketplace</h2>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-y-6">
        <div className="flex flex-col gap-y-1">
          <label htmlFor="email" className="text-base">
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Enter your email"
            className="rounded-md border border-brand-neutral-400 p-2"
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <label htmlFor="password" className="text-base">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            className="rounded-md border border-brand-neutral-400 p-2"
          />
        </div>

        <input
          type="submit"
          value="Login"
          className="w-full rounded-md bg-black p-4 text-base font-medium text-white"
        />
      </form>

      <div className="my-4 w-full border border-neutral-400" />

      <div className="flex flex-wrap justify-center gap-x-1">
        <p className="text-brand-black-100">Don&apos;t have an account?</p>

        <Link href="/signup" className="font-medium uppercase">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Login;
