"use client";

import { useContext } from "react";
import { HiXMark } from "react-icons/hi2";
import { Dialog, DialogPanel, DialogBackdrop } from "@headlessui/react";

import { classes } from "@/utils/classes";
import { ModalProviderContext } from "@/providers/modal.provider";

interface IModalProps extends IChildren {
  title: string;
  wrapperClassname?: string;
}

export const Modal: React.FC<IModalProps> = ({
  title,
  wrapperClassname,
  children,
}) => {
  const { open, setOpen } = useContext(ModalProviderContext);
  return (
    <div>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className={classes("px-4 py-3", wrapperClassname)}>
                <div className="w-full flex flex-nowrap mb-4 justify-between items-center">
                  <p className="font-medium">متن تستی</p>
                  <button onClick={() => setOpen(false)}>
                    <HiXMark className="w-5 h-5 cursor-pointer" />
                  </button>
                </div>
                {children}
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};
