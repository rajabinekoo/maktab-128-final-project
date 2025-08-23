"use client";

import Image from "next/image";

interface IProfileAvatarProps {
  src: string;
}

export const ProfileAvatar: React.FC<IProfileAvatarProps> = ({ src }) => {
  return (
    <button className="relative w-[40px] h-[40px] cursor-pointer">
      <Image src={src} alt="avatar" fill className="object-contain" />
    </button>
  );
};
