
import styles from "./ui/home.module.css";
import { fetchRevenue } from "../lib/data";
import { MDXRemote } from 'next-mdx-remote/rsc'

export default async function Home({ searchParams }: { searchParams: { query: string } }) {
  async function test(){
    // 2812b5514994576c0a17e78ed2a44e09-c-app
    const data = await fetch('https://quote.tradeswitcher.com/quote-stock-b-api/depth-tick?token=2812b5514994576c0a17e78ed2a44e09-c-app&query={}').then(res => res.json());
    console.log("data-----",data);
    
   }
   test();

  const query = searchParams?.query || ''
  const revenues = await fetchRevenue(query);
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen">
      <div className="wrapper">
      <MDXRemote
      source={`# Hello World

      This is from Server Components!
      `}
    />
    </div>
      <div className={styles.shape}></div>
      <div className="w-6/12 shadow-cyan-500/20 shadow-lg rounded-lg p-4">
        {revenues.map((revenue: any, index: number) => (
          <div className="flex justify-between" key={revenue.id}>
            <div
              className={`text-lg ${
                revenue.revenue > 3000 ? "text-red-500" : "text-blue-500"
              }`}
            >
              month: {revenue.month}
            </div>
            <div className={`text-lg font-bold ${ revenue.revenue > 3000 ? "text-red-500" : "text-blue-500"
              }`}>revenue: { revenue.revenue }</div>
          </div>
        ))}
      </div>
      <div className="prose sm:prose-xl">
  <h1>This is Title</h1>
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit obcaecati
    temporibus delectus et eaque non enim, consequatur illum velit sapiente
    molestiae soluta voluptatibus omnis quasi dolores maxime officiis at vero!
  </p>
  <p>
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut dignissimos
    quasi pariatur nobis ipsa ullam! Commodi modi, saepe eveniet soluta numquam
    quasi ducimus, corrupti architecto distinctio dignissimos alias nesciunt
    doloribus?
  </p>
</div>
    </div>
  );
}
