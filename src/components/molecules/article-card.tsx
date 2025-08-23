import Image from "next/image";
import { Button } from "./buttons";

interface IArticleCard extends IArticle {
  userMode?: boolean;
  onChangePublishStatus?: () => void;
}

export const ArticleCard: React.FC<IArticleCard> = ({
  id,
  title,
  publish,
  thumbnail,
  description,
  collectionId,
  userMode = false,
  onChangePublishStatus,
}) => {
  const thumbnailLink = `http://127.0.0.1:8090/api/files/${collectionId}/${id}/${thumbnail}`;
  return (
    <div className="w-full shadow border border-zinc-200 rounded-lg bg-white px-2 py-2">
      <div className="w-full relative min-h-[200px]">
        <Image
          fill
          alt="thumbnail"
          src={thumbnailLink}
          className="object-cover rounded-md"
        />
      </div>
      <div className="mt-4 space-y-2">
        <p title={title} className="font-medium line-clamp-1">
          {title}
        </p>
        <p className="font-semibold text-xs text-zinc-500 line-clamp-2">
          {description}
        </p>
        {userMode && (
          <>
            <p className="font-semibold text-xs text-zinc-500">
              وضعیت انتشار: {publish ? "منتشر شده" : "مخفی شده"}
            </p>
            <Button
              onClick={onChangePublishStatus}
              className="!text-xs !rounded-md"
              variant="outline"
            >
              {publish ? "مخفی شود" : "منتشر شود"}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
