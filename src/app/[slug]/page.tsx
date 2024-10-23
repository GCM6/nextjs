// import { useEffect, useRef, useState } from 'react';
// import { useRouter } from 'next/navigation';
import { MDXRemote } from "next-mdx-remote/rsc";
import styles from "./page.module.css";
import { getPostBySlug } from "@/app/lib/posts";
import "./markdown.css";
import AnimatedContainer from './AnimatedContainer';

export default function Page({ params }: { params: { slug: string } }) {
  const content = getPostBySlug(params.slug);

  return (
    <AnimatedContainer>
      <div className="markdown bg-white rounded-lg p-8">
        <MDXRemote
          source={content}
          options={{
            parseFrontmatter: true,
          }}
        />
      </div>
    </AnimatedContainer>
  );
}
