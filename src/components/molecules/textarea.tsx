"use client";

import { classes } from "@/utils/classes";
import { DetailedHTMLProps, TextareaHTMLAttributes, useId } from "react";

interface IInputProps
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  error?: string;
  label?: string;
}

export const Textarea: React.FC<IInputProps> = ({
  className,
  error,
  label,
  ...props
}) => {
  const id = useId();

  return (
    <div>
      {label && (
        <label className="text-sm font-medium block pb-1" htmlFor={id}>
          {label}
        </label>
      )}
      <textarea
        id={id}
        rows={2}
        className={classes(
          "border rounded-lg px-2 py-1 w-full disabled:bg-gray-50",
          !!error ? "border-red-300" : "border-zinc-300",
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-red-500 text-sm font-medium pt-1 text-right">{error}</p>
      )}
    </div>
  );
};
