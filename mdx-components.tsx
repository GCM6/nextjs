import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    wrapper: ({ children }) => (
      
      <div
        className="prose prose-stone md:prose-lg lg:prose-xl">
        {children}
      </div>
    ),
    // 针对a标签
    a: ({ children, href }) => (
      <a href={href} className=" text-blue-600 hover:text-blue-500">
        {children}
      </a>
    ),
  };
}
