"use client";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

import { appMessage } from "@/utils/messages";
import { ProfileAvatar } from "../atoms/avatar";
import { useAppDispatch } from "@/hooks/redux.hook";
import { GradientAvatar } from "../atoms/gradient-avatar";
import { userInfoActions } from "@/redux/user-info.slice";

interface IProfileDrowpdownProps {
  avatar?: string;
  email: string;
}

const rowClassName =
  "hover:bg-zinc-100 w-full cursor-pointer rounded-md py-1 px-1 text-right";

export const ProfileDropdown: React.FC<IProfileDrowpdownProps> = ({
  avatar,
  email,
}) => {
  const dispatch = useAppDispatch();
  const { push } = useRouter();

  const signout = () => {
    dispatch(userInfoActions.logout());
    push("/signin");
    toast.info(appMessage.signout);
  };

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
        <MenuItem>
          <Link href="/profile" className="block py-1 px-1">
            <button className={rowClassName}>پروفایل</button>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href="/newArticle" className="block py-1 px-1">
            <button className={rowClassName}>ایجاد مقاله</button>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href="/settings" className="block py-1 px-1">
            <button className={rowClassName}>تنظیمات </button>
          </Link>
        </MenuItem>
        <MenuItem>
          <div className="py-1 px-1">
            <button onClick={signout} className={rowClassName}>
              خروج از حساب
            </button>
          </div>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};
