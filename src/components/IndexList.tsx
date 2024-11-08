"use client";
import { useRouter } from "next/navigation";
import type { PostMetaData } from "@/app/lib/posts";
import { Image } from "@nextui-org/image";

type BlogProps = {
  data: PostMetaData[];
};

export function IndexList(props: BlogProps) {
  const router = useRouter();
  const { data } = props;

  function handleItemClick(event: React.MouseEvent, post: PostMetaData) {
    const target = event.target as HTMLDivElement;
    const rect = target.getBoundingClientRect();

    // 保存元素信息到 sessionStorage
    sessionStorage.setItem(
      "animatedElement",
      JSON.stringify({
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
        backgroundColor: window.getComputedStyle(target).backgroundColor,
      })
    );
    // 立即跳转到详情页

    router.push(`/${post.meta.slug}`);
  }

  return (
    <div className="grid grid-flow-row auto-rows-max gap-3 p-6" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(288px, 1fr))' }}>
      {data?.map((post) => (
        <div
          key={post.meta.title}
          onClick={(event) => handleItemClick(event, post)}
          className="w-72 h-96 bg-gradient-to-br from-blue-500 to-purple-500 flex flex-col items-center justify-between cursor-pointer rounded-xl shadow-xl hover:scale-105 transition-all duration-300"
        >
          {post.meta.background && (
            <Image
              src={post.meta.background}
              alt={post.meta.title}
              radius="sm"
              shadow="sm"
              isBlurred
              classNames={{
                wrapper: "w-72",
                img: "w-72 h-56",
              }}
            />
          )}
          <div className="p-5 text-center flex-grow flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-white mb-3 line-clamp-2 hover:line-clamp-none transition-all duration-300">
              {post.meta.title}
            </h2>
            <p className="text-sm text-white opacity-80 mt-2">
              {post.meta.date}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
