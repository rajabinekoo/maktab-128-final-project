"use client";

import { createContext, SetStateAction, useState, Dispatch } from "react";

interface IEditorProviderContext {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

export const EditorProviderContext = createContext<IEditorProviderContext>({
  value: '',
  setValue: () => undefined,
});

export const EditorProvider: React.FC<IChildren> = ({ children }) => {
  const [value, setValue] = useState<string>('');
  return (
    <EditorProviderContext.Provider value={{ value, setValue }}>
      {children}
    </EditorProviderContext.Provider>
  );
};
