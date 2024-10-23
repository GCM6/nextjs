'use client'

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from "../ui/page.module.css";

export default function AnimatedContainer({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const animatedElement = JSON.parse(sessionStorage.getItem('animatedElement') || '{}');
    const container = containerRef.current;

    if (container && animatedElement.left) {
      // 设置初始状态
      container.style.position = 'fixed';
      container.style.left = `${animatedElement.left}px`;
      container.style.top = `${animatedElement.top}px`;
      container.style.width = `${animatedElement.width}px`;
      container.style.height = `${animatedElement.height}px`;
      container.style.backgroundColor = animatedElement.backgroundColor;

      // 触发动画
      requestAnimationFrame(() => {
        container.classList.add(styles.animateExpand);
      });

      // 动画结束后更新状态
      container.addEventListener('transitionend', () => {
        setIsAnimating(false);
      }, { once: true });
    } else {
      setIsAnimating(false);
    }
  }, []);

  const handleClose = () => {
    console.log('handleClose');
    if (isAnimating) return;

    const container = containerRef.current;
    if (container) {
      const animatedElement = JSON.parse(sessionStorage.getItem('animatedElement') || '{}');
      container.style.left = `${animatedElement.left}px`;
      container.style.top = `${animatedElement.top}px`;
      container.style.width = `${animatedElement.width}px`;
      container.style.height = `${animatedElement.height}px`;
      container.classList.remove(styles.animateExpand);

      container.addEventListener('transitionend', () => {
        router.back();
      }, { once: true });
    }
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${isAnimating ? 'pointer-events-none' : ''}`} onClick={handleClose}>
      <div ref={containerRef} className={`${styles.animatedElement}`} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

