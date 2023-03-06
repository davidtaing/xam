import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { users } from "../../../design samples/data/users_data";

export const loginFormSchema = z.object({
  branchId: z.coerce.number().int().positive(),
  userName: z.string(),
  password: z.string(),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    users.forEach((user) => {
      // contrived example, so I'm not too bothered
      // with proper implementation here.
      const branchIdMatch = data.branchId === user.branchId;
      const userNameMatch = data.userName === user.userName;
      const passwordMatch = data.password === user.password;

      if (branchIdMatch && userNameMatch && passwordMatch) {
        alert("Login successful");
      } else {
        alert("failed to login");
      }
    });
  };

  return (
    <div
      aria-label="Login Panel"
      className="m-auto max-w-xl border border-slate-900 p-8"
    >
      <h1 className="text-2xl font-medium">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
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
        </div>
        <button
          type="submit"
          className="rounded-md bg-blue-600 py-2 px-4 text-white hover:bg-blue-700 active:bg-blue-800"
        >
          Login
        </button>

        {errors.branchId?.message}
        {errors.userName?.message}
        {errors.password?.message}
      </form>
    </div>
  );
}
