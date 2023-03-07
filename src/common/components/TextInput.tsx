import { Ref, forwardRef } from "react";

export type TextInputProps = {
  label: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const TextInput = forwardRef(function TextInput(
  { id, label, error, ...restProps }: TextInputProps,
  ref: Ref<HTMLInputElement>
) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm">
        {label}
      </label>
      <input
        ref={ref}
        id={id}
        {...restProps}
        className="rounded-md border border-slate-900 px-4 py-2"
      />
      <span className="m-h-5 text-sm text-red-500">
        {error ?? <span className="invisible">.</span>}
      </span>
    </div>
  );
});
