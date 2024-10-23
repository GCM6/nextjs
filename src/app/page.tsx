
import IndexAnimate from "./ui/indexAnimate/page";
import { getSortedPostsData } from "./lib/posts";

export default async function Home() {
  const allPostsData = await getSortedPostsData();
  
  return (
  <IndexAnimate data={allPostsData} />
 )
}
