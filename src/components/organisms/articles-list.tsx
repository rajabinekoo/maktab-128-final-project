"use client";

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Pagination } from "flowbite-react";
import { useMutation } from "@tanstack/react-query";

import { appMessage } from "@/utils/messages";
import { useAppSelector } from "@/hooks/redux.hook";
import { ArticleCard } from "../molecules/article-card";
import { extractAxiosError } from "@/utils/error-handler";
import { changePublishStatus } from "@/requests/articles";

interface IArticlesListProps {
  list: IListResponse<IArticle>;
  profileMode?: boolean;
}

export const ArticlesList: React.FC<IArticlesListProps> = ({
  list,
  profileMode = false,
}) => {
  const { push } = useRouter();
  const userId = useAppSelector((state) => state.userInfo?.info?.id);

  const ps = useMutation({
    mutationKey: ["publish-state"],
    mutationFn: changePublishStatus,
    onSuccess: () => {
      toast.success(appMessage.updateArticle);
      push("/profile");
    },
    onError: extractAxiosError,
  });

  const onPageChange = (page: number) => {
    const search = new URLSearchParams(window.location.search);
    search.set("page", page.toString());
    push(window.location.pathname + "?" + search.toString());
  };

  return (
    <>
      <section className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {list.items.map((el) => (
          <ArticleCard
            key={el.id}
            userMode={profileMode && el.userId === userId}
            onChangePublishStatus={() => ps.mutate(el.id)}
            {...el}
          />
        ))}
      </section>
      <div className="flex justify-center mt-6" dir="ltr">
        <Pagination
          nextLabel="بعدی"
          previousLabel="قبلی"
          currentPage={list.page || 1}
          totalPages={list.totalPages || 1}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
};
