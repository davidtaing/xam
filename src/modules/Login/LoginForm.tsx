import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { loginMutation } from "./LoginService";
import { useUserContext } from "../Auth/Users";
import { TextInput } from "@/common/components/TextInput";

export const loginFormSchema = z.object({
  branchId: z
    .string({
      invalid_type_error: "Branch id is not a number",
    })
    .min(1, "Please provide a branch id")
    .regex(
      /\d+/,
      "Please ensure the Branch id is a numeric digit value (0-9)."
    ),
  userName: z.string().min(1, "Please provide a username"),
  password: z.string().min(1, "Please provide a password"),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;

export function LoginForm() {
  const router = useRouter();
  const { user, setUser } = useUserContext();
  const [submissionError, setSubmissionError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    mode: "onBlur",
  });

  const onLoginFormSubmit = async (data: LoginFormValues) => {
    try {
      const response = await loginMutation(data);
      setUser(response);
      router.push("/dashboard");
    } catch (err: any) {
      setSubmissionError(err.message);
    }
  };

  return (
    <div
      aria-label="Login Panel"
      className="m-auto w-full max-w-md border border-slate-900 p-8"
    >
      <h1 className="text-2xl font-medium">Login</h1>
      <form
        onSubmit={handleSubmit(onLoginFormSubmit)}
        className="flex flex-col gap-2"
      >
        <TextInput
          id="branch-id"
          label="Branch id"
          error={errors.branchId?.message}
          type="text"
          {...register("branchId")}
        />
        <TextInput
          id="userName"
          label="Username"
          error={errors.userName?.message}
          type="text"
          {...register("userName")}
        />
        <TextInput
          id="password"
          label="Password"
          error={errors.password?.message}
          type="password"
          {...register("password")}
        />

        <button
          type="submit"
          className="mt-4 rounded-md bg-blue-600 py-2 px-4 text-white hover:bg-blue-700 active:bg-blue-800"
        >
          Login
        </button>
        {submissionError ? (
          <div className="mt-4 rounded-md border border-red-400 bg-red-300 py-3 px-4 text-sm text-red-800">
            {submissionError}
          </div>
        ) : (
          <div className="invisible mt-4 rounded-md py-3 px-4 text-sm leading-10">
            .
          </div>
        )}
      </form>
    </div>
  );
}
