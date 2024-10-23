import { getSortedPostsData, type PostMetaData } from "@/app/lib/posts";
import { IndexList } from "@/components/IndexList";

export default async function Home() {
  const allPostsData: PostMetaData[] = await getSortedPostsData();

  return (
    <>
      <IndexList data={allPostsData} />
    </>
  );
}
