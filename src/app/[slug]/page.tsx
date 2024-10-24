
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug } from "@/app/lib/posts";
import "./ui/markdown.css";
import AnimatedContainer from './components/AnimatedContainer';

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
