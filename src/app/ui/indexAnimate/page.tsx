"use client";
import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function IndexAnimate() {
  const container = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const containerDom = container.current;
    if (containerDom) {
      const children = containerDom.children as HTMLCollection;

      Array.from(children).forEach((item) => {
        item.addEventListener("click", handleItemClick);
      });
    }
  }, []);

  function handleItemClick(event: Event) {
    const target = event.target as HTMLDivElement;
    const rect = target.getBoundingClientRect();

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
    router.push(`/ui/detailPage?id=${target.innerText}`);
  }

  return (
    <div ref={container} className="flex gap-4 text-center text-2xl text-white">
      <div className="w-1/5 h-[300px] bg-blue-500 flex items-center justify-center cursor-pointer rounded-lg hover:scale-110 transition-all duration-300">
        1
      </div>
      <div className="w-1/5 h-[300px] bg-blue-400 flex items-center justify-center cursor-pointer rounded-lg hover:scale-110 transition-all duration-300">
        2
      </div>
      <div className="w-1/5 h-[300px] bg-blue-300 flex items-center justify-center cursor-pointer rounded-lg hover:scale-110 transition-all duration-300">
        3
      </div>
      <div className="w-1/5 h-[300px] bg-blue-200 flex items-center justify-center cursor-pointer rounded-lg hover:scale-110 transition-all duration-300">
        4
      </div>
      <div className="w-1/5 h-[300px] bg-blue-100 flex items-center justify-center cursor-pointer rounded-lg hover:scale-110 transition-all duration-300">
        5
      </div>
    </div>
  );
}
