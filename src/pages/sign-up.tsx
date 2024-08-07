import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";
import Loader from "~/components/Loader";
import PasswordInput from "~/components/PasswordInput";
import { api } from "~/utils/api";

type SignUpType = {
  name: string;
  email: string;
  password: string;
};

const SignUp = () => {
  const router = useRouter();
  const [password, setPassword] = React.useState("");

  const createUser = api.post.createUser.useMutation({
    onSuccess: async (data) => {
      if (data.success) {
        toast.success("Successfully signed up", {
          position: "bottom-right",
        });
        await router.push({
          pathname: "/verify-email",
          query: { id: data.userId! },
        });
      } else {
        toast.error(data.message, {
          position: "bottom-right",
        });
      }
      setPassword("");
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const body = {} as SignUpType;
    for (const [key, value] of form.entries()) {
      body[key as keyof SignUpType] = value as string;
    }
    createUser.mutate({ ...body, password });
  }

  if (createUser.isPending) return <Loader />;

  return (
    <div className="rounded-[20px] border border-brand-neutral-400 p-5 md:p-10">
      <div className="text-center">
        <p className="mb-4 text-2xl font-semibold md:text-3.5xl">
          Create your account
        </p>

        <h1 className="text-1.5xl font-semibold md:text-2xl">
          Welcome to ECOMMERCE
        </h1>
        <h2 className="text-base">The next gen business marketplace</h2>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-y-6">
        <div className="flex flex-col gap-y-1">
          <label htmlFor="name" className="text-base">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            autoComplete="username"
            placeholder="Enter your name"
            className="rounded-md border border-brand-neutral-400 p-2"
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <label htmlFor="email" className="text-base">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            autoComplete="email"
            placeholder="Enter your email"
            className="rounded-md border border-brand-neutral-400 p-2"
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <label htmlFor="password" className="text-base">
            Password
          </label>
          <PasswordInput
            autoComplete="new-password"
            password={password}
            setPassword={setPassword}
            hideStrengthMeter={false}
          />
        </div>

        <input
          type="submit"
          value="Create account"
          className="w-full cursor-pointer rounded-md bg-black p-4 text-base font-medium text-white"
        />
      </form>

      <div className="my-4 w-full border border-neutral-400" />

      <div className="flex flex-wrap justify-center gap-x-1">
        <p className="text-brand-black-100">Have an Account?</p>

        <Link href="/login" className="font-medium uppercase">
          Login
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
