import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { classes } from "@/utils/classes";

type cstyle = "primary" | "secondary";
type variant = "outline" | "contains" | "ghost";

interface IButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: variant;
  cstyle?: cstyle;
}

const styleExtraction = (v: variant, s: cstyle) => {
  const primaryOutline =
    "border border-zinc-600 hover:bg-zinc-100 text-zinc-600 font-semibold disabled:border-zinc-400 disabled:text-zinc-400";
  const secondaryOutline =
    "border border-blue-600 hover:bg-blue-100 text-blue-600 font-semibold disabled:border-blue-400 disabled:text-blue-400";
  const primaryGhost =
    "bg-zinc-200 hover:bg-zinc-100 text-zinc-600 font-semibold disabled:bg-zinc-100 disabled:text-zinc-400";
  const secondaryGhost =
    "bg-blue-200 hover:bg-blue-100 text-blue-600 font-semibold disabled:bg-blue-100 disabled:text-blue-300";
  const primaryDefault =
    "bg-zinc-600 hover:bg-zinc-500 text-white font-semibold disabled:bg-zinc-400";
  const secondaryDefault =
    "bg-blue-600 hover:bg-blue-500 text-white font-semibold disabled:bg-blue-300";

  switch (v) {
    case "outline":
      return s === "primary" ? primaryOutline : secondaryOutline;
    case "ghost":
      return s === "primary" ? primaryGhost : secondaryGhost;
    default:
      return s === "primary" ? primaryDefault : secondaryDefault;
  }
};

export const Button: React.FC<IButtonProps> = ({
  className,
  children,
  variant = "contains",
  cstyle = "primary",
  ...props
}) => {
  return (
    <button
      className={classes(
        styleExtraction(variant, cstyle),
        "rounded-xl w-full py-2 cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
