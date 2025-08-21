import React from "react";
import { stringToGradient } from "@/utils/strToColor";

interface IGradientAvatarProps {
  email: string;
}

export const GradientAvatar: React.FC<IGradientAvatarProps> = ({ email }) => {
  return (
    <div
      className="w-[40px] h-[40px] cursor-pointer rounded-full"
      style={{ background: stringToGradient(email) }}
    ></div>
  );
};
