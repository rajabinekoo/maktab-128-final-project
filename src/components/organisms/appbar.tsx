"use client";

import { useMemo, useState } from "react";

import Link from "next/link";
import { toast } from "react-toastify";
import { Dialog } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { HiBars3, HiXMark } from "react-icons/hi2";

import { appMessage } from "@/utils/messages";
import { userInfoActions } from "@/redux/user-info.slice";
import { ProfileDropdown } from "../molecules/profile-dropdown";
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hook";

const navigation: Array<Omit<IMenuItem, "href"> & { href: string }> = [
  { name: "مقالات برتر", href: "#" },
  { name: "مقالات جدید", href: "#" },
  { name: "مقالات محبوب شما", href: "#" },
  { name: "مقالات دنبال شونده ها", href: "#" },
];

const mobileSidebarButtonsMenu =
  "w-full cursor-pointer -mx-3 block rounded-lg px-3 py-2.5 text-right text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50";

export const AppBar = () => {
  const { isLoading, info } = useAppSelector((state) => state.userInfo);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { push } = useRouter();

  const profileNavigation: Array<IMenuItem> = useMemo(() => {
    return [
      { name: "پروفایل", href: "/profile" },
      { name: "ایجاد مقاله", href: "/newArticle" },
      { name: "تنظیمات", href: "/settings" },
      {
        name: "خروج از حساب",
        onClick: () => {
          setMobileMenuOpen(false);
          dispatch(userInfoActions.logout());
          push("/signin");
          toast.info(appMessage.signout);
        },
      },
    ];
  }, []);

  return (
    <header className="bg-zinc-50">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between h-[70px] px-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex items-center gap-x-12">
          <Link href="/" className="-m-1.5 p-1.5">
            <img className="h-16 w-auto" src="/logo.svg" alt="logo" />
          </Link>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <HiBars3 className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex">
          {isLoading || !info ? (
            <Link
              href="/signin"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              ورود
            </Link>
          ) : (
            <ProfileDropdown
              items={profileNavigation}
              email={info.email}
              avatar={info.avatar}
            />
          )}
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <img className="h-16 w-auto" src="/logo.svg" alt="logo" />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <HiXMark className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                {isLoading || !info ? (
                  <Link
                    href="/signin"
                    onClick={() => setMobileMenuOpen(false)}
                    className={mobileSidebarButtonsMenu}
                  >
                    ورود
                  </Link>
                ) : (
                  <>
                    {profileNavigation.map((el) =>
                      !!el.href ? (
                        <div key={el.name}>
                          <Link
                            onClick={() => setMobileMenuOpen(false)}
                            href={el.href}
                            className="block py-1 px-1"
                          >
                            <button className={mobileSidebarButtonsMenu}>
                              {el.name}
                            </button>
                          </Link>
                        </div>
                      ) : !!el.onClick ? (
                        <div key={el.name}>
                          <div className="py-1 px-1">
                            <button
                              onClick={el.onClick}
                              className={mobileSidebarButtonsMenu}
                            >
                              {el.name}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <></>
                      )
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};
