"use client";
import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PostMetaData } from "@/app/lib/posts";
import {Image} from "@nextui-org/image";


export default function IndexAnimate({ data }: { data: PostMetaData[] }) {
  const container = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // useEffect(() => {
  //   console.log("data", data);
    
  //   const containerDom = container.current;
    
  //   if (containerDom) {
  //     const children = containerDom.children as HTMLCollection;

  //     Array.from(children).forEach((item) => {
  //       console.log("item", item);
        
  //       item.addEventListener("click", handleItemClick);
  //     });
  //   }
  // }, []);


  function handleItemClick(event: React.MouseEvent,posts: PostMetaData) {
    const target = event.target as HTMLDivElement;
    const rect = target.getBoundingClientRect();

    console.log("rect", rect);
    

    // 保存元素信息到 sessionStorage
    sessionStorage.setItem('animatedElement', JSON.stringify({
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
      backgroundColor: window.getComputedStyle(target).backgroundColor,
      content: target.innerHTML
    }));
    // 立即跳转到详情页

    router.push(`/${posts.meta.slug}`);
  }

  return (
    <div ref={container} className="flex flex-wrap gap-6 justify-center p-6">
      {data.map((post) => (
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
                img: "w-72 h-56"
              }}
            />
          )}
          <div className="p-5 text-center flex-grow flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-white mb-3 line-clamp-2 hover:line-clamp-none transition-all duration-300">
              {post.meta.title}{post.meta.slug}
            </h2>
            <p className="text-sm text-white opacity-80 mt-2">{post.meta.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
