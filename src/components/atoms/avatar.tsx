"use client";

import Image from "next/image";
import Link from "next/link";

interface IProfileAvatarProps {
  src: string;
}

export const ProfileAvatar: React.FC<IProfileAvatarProps> = ({ src }) => {
  return (
    <Link href="/profile">
      <button className="relative w-[40px] h-[40px] cursor-pointer">
        <Image src={src} alt="avatar" fill className="object-contain" />
      </button>
    </Link>
  );
};
