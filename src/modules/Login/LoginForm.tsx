import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { loginMutation } from "./LoginService";
import { useState } from "react";

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
      await loginMutation(data);
    } catch (err: any) {
      setSubmissionError(err.message);
    }
  };

  return (
    <div
      aria-label="Login Panel"
      className="m-auto max-w-xl border border-slate-900 p-8"
    >
      <h1 className="text-2xl font-medium">Login</h1>
      <form
        onSubmit={handleSubmit(onLoginFormSubmit)}
        className="flex flex-col gap-8"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="branch-id" className="text-sm">
            Branch id
          </label>
          <input
            id="branch-id"
            type="text"
            {...register("branchId")}
            className="rounded-md border border-slate-900 px-4 py-2"
          />
          <span className="text-red-500">{errors.branchId?.message}</span>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="userName" className="text-sm">
            Username
          </label>
          <input
            id="userName"
            type="text"
            {...register("userName")}
            className="rounded-md border border-slate-900 px-4 py-2"
          />
          <span className="text-red-500">{errors.userName?.message}</span>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            className="rounded-md border border-slate-900 px-4 py-2"
          />
          <span className="text-red-500">{errors.password?.message}</span>
        </div>
        <button
          type="submit"
          className="rounded-md bg-blue-600 py-2 px-4 text-white hover:bg-blue-700 active:bg-blue-800"
        >
          Login
        </button>
        <p>{submissionError}</p>
      </form>
    </div>
  );
}
