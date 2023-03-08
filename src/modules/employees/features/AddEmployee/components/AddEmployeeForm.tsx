import { TextInput } from "@/common/components/TextInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const addEmployeeFormSchema = z.object({
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
  password: z.string().min(10, "Password must be at least 10 characters long"),
  firstName: z.string().min(1, "Please provide a first name"),
  middleName: z.string(),
  lastName: z.string().min(1, "Please provide a last name"),
  position: z.string().min(1, "Please provide a job position"),
});

export type AddEmployeeFormValues = z.infer<typeof addEmployeeFormSchema>;

export type AddEmployeeFormProps = {
  onsubmit(data: AddEmployeeFormValues): void;
};

export function AddEmployeeForm({ onsubmit }: AddEmployeeFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddEmployeeFormValues>({
    resolver: zodResolver(addEmployeeFormSchema),
    mode: "onBlur",
  });

  return (
    <form
      className="max-w-sm rounded-lg bg-gray-300 p-8"
      onSubmit={handleSubmit(onsubmit)}
    >
      <TextInput
        id="branch-id"
        label="Branch ID"
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
        id="firstName"
        label="First Name"
        error={errors.firstName?.message}
        type="text"
        {...register("firstName")}
      />
      <TextInput
        id="middleName"
        label="Middle Name"
        error={errors.middleName?.message}
        type="text"
        {...register("middleName")}
      />
      <TextInput
        id="lastName"
        label="Last Name"
        error={errors.lastName?.message}
        type="text"
        {...register("lastName")}
      />
      <TextInput
        id="position"
        label="Position"
        error={errors.position?.message}
        type="text"
        {...register("position")}
      />
      <TextInput
        id="password"
        label="Password"
        error={errors.password?.message}
        type="password"
        {...register("password")}
      />
      <div className="flex justify-end gap-6">
        <button
          type="reset"
          className="mt-4 rounded-md bg-gray-50 py-2 px-4 hover:bg-gray-200 active:bg-gray-300"
        >
          Reset
        </button>
        <button
          type="submit"
          className="mt-4 rounded-md bg-blue-600 py-2 px-4 text-white hover:bg-blue-700 active:bg-blue-800"
        >
          Add
        </button>
      </div>
    </form>
  );
}
