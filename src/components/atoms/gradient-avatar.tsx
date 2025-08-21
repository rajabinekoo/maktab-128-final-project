import React from "react";
import { stringToGradient } from "@/utils/strToColor";
import Link from "next/link";

interface IGradientAvatarProps {
  email: string;
}

export const GradientAvatar: React.FC<IGradientAvatarProps> = ({ email }) => {
  return (
    <Link href="/profile">
      <div
        className="w-[40px] h-[40px] cursor-pointer rounded-full"
        style={{ background: stringToGradient(email) }}
      ></div>
    </Link>
  );
};
