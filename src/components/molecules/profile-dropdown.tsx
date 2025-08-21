"use client";
import Link from "next/link";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

import { ProfileAvatar } from "../atoms/avatar";
import { GradientAvatar } from "../atoms/gradient-avatar";

interface IProfileDrowpdownProps {
  avatar?: string;
  email: string;
  items: Array<IMenuItem>;
}

const rowClassName =
  "hover:bg-zinc-100 w-full cursor-pointer rounded-md py-1 px-1 text-right";

export const ProfileDropdown: React.FC<IProfileDrowpdownProps> = ({
  avatar,
  email,
  items,
}) => {
  return (
    <Menu as="div" className="relative inline-block">
      <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white/10 px-3 py-2 font-semibold inset-ring-1 inset-ring-white/5 hover:bg-white/20">
        {!!avatar ? (
          <ProfileAvatar src={avatar} />
        ) : (
          <GradientAvatar email={email} />
        )}
      </MenuButton>

      <MenuItems
        transition
        className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md border-gray-300 border shadow outline-1 -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        {items.map((el) =>
          !!el.href ? (
            <MenuItem key={el.name}>
              <Link href={el.href} className="block py-1 px-1">
                <button className={rowClassName}>{el.name}</button>
              </Link>
            </MenuItem>
          ) : !!el.onClick ? (
            <MenuItem key={el.name}>
              <div className="py-1 px-1">
                <button onClick={el.onClick} className={rowClassName}>
                  {el.name}
                </button>
              </div>
            </MenuItem>
          ) : (
            <></>
          )
        )}
      </MenuItems>
    </Menu>
  );
};
