"use client";

import { createContext, SetStateAction, useState, Dispatch } from "react";

interface IModalProviderContext {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const ModalProviderContext = createContext<IModalProviderContext>({
  open: false,
  setOpen: () => undefined,
});

export const ModalProvider: React.FC<IChildren> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <ModalProviderContext.Provider value={{ open, setOpen }}>
      {children}
    </ModalProviderContext.Provider>
  );
};
