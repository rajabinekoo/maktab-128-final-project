"use client";

import { useContext } from "react";

import { Modal } from "@/components/molecules/modal";
import { Button } from "@/components/molecules/buttons";
import { AuthGuard } from "@/providers/auth-guard.provider";
import { EditorProvider } from "@/providers/editor.provider";
import { TextEditor } from "@/components/molecules/text-editor";
import { NewArticle } from "@/components/organisms/new-article";
import {
  ModalProvider,
  ModalProviderContext,
} from "@/providers/modal.provider";

const Head: React.FC = () => {
  const { setOpen } = useContext(ModalProviderContext);
  return (
    <>
      <section className="flex flex-nowrap items-center justify-between mb-10">
        <h1 className="text-md sm:text-lg md:text-xl font-semibold md:font-bold">
          ایجاد مقاله
        </h1>
        <div className="w-full max-w-[100px]">
          <Button onClick={() => setOpen(true)} variant="ghost">
            ثبت
          </Button>
        </div>
      </section>
      <Modal title="ثبت مقاله">
        <NewArticle />
      </Modal>
    </>
  );
};

export default function NewArticlePage() {
  return (
    <main className="container mx-auto px-3 py-10">
      <EditorProvider>
        <ModalProvider>
          <Head />
        </ModalProvider>
        <AuthGuard>
          <TextEditor />
        </AuthGuard>
      </EditorProvider>
    </main>
  );
}
