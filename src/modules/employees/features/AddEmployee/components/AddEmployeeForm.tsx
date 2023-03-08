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
  password: z.string().min(1, "Please provide a password"),
  firstName: z.string().min(1),
  middleName: z.string().min(1),
  lastName: z.string().min(1),
  position: z.string().min(1),
});

export type AddEmployeeFormValues = z.infer<typeof addEmployeeFormSchema>;

export function AddEmployeeForm() {
  return <></>;
}
