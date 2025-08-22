"use client";

import { useContext } from "react";
import dynamic from "next/dynamic";
import { EditorProviderContext } from "@/providers/editor.provider";

const Editor = dynamic(
  () => import("@tinymce/tinymce-react").then((module) => module.Editor),
  { ssr: false }
);

export const TextEditor: React.FC = () => {
  const { setValue } = useContext(EditorProviderContext);

  return (
    <>
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
        initialValue="<p>متن مورد نظر را وارد کنید</p>"
        onEditorChange={(text) => setValue(text)}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
            "directionality",
          ],
          toolbar:
            "undo redo | blocks fontsize | bold italic forecolor backcolor | alignleft aligncenter " +
            "alignright alignjustify ltr rtl | bullist numlist outdent indent | " +
            "image media anchor table | removeformat fullscreen",
          content_style: `
          @font-face { font-family: 'IRANSans'; src: url('/fonts/IRANSans/IRANSansX-Thin.woff2') format('woff2'); font-weight: 100; font-style: normal; }
          @font-face { font-family: 'IRANSans'; src: url('/fonts/IRANSans/IRANSansX-UltraLight.woff2') format('woff2'); font-weight: 200; font-style: normal; }
          @font-face { font-family: 'IRANSans'; src: url('/fonts/IRANSans/IRANSansX-Light.woff2') format('woff2'); font-weight: 300; font-style: normal; }
          @font-face { font-family: 'IRANSans'; src: url('/fonts/IRANSans/IRANSansX-Regular.woff2') format('woff2'); font-weight: 400; font-style: normal; }
          @font-face { font-family: 'IRANSans'; src: url('/fonts/IRANSans/IRANSansX-Medium.woff2') format('woff2'); font-weight: 500; font-style: normal; }
          @font-face { font-family: 'IRANSans'; src: url('/fonts/IRANSans/IRANSansX-DemiBold.woff2') format('woff2'); font-weight: 600; font-style: normal; }
          @font-face { font-family: 'IRANSans'; src: url('/fonts/IRANSans/IRANSansX-Bold.woff2') format('woff2'); font-weight: 700; font-style: normal; }
          @font-face { font-family: 'IRANSans'; src: url('/fonts/IRANSans/IRANSansX-ExtraBold.woff2') format('woff2'); font-weight: 800; font-style: normal; }
          @font-face { font-family: 'IRANSans'; src: url('/fonts/IRANSans/IRANSansX-Black.woff2') format('woff2'); font-weight: 900; font-style: normal; }

          body {
            font-family: 'IRANSans', sans-serif;
            font-weight: 400;
          }

          p, h1, h2, h3, h4, h5, h6, li, span {
            font-family: 'IRANSans', sans-serif;
          }`,
          font_size_formats: "8px 10px 12px 14px 16px 18px 24px 36px 48px",
          content_class: "",
        }}
      />
    </>
  );
};
