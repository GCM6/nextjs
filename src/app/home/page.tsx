import User from "../user/page";
import styles from "./ui/home.module.css";
import { fetchRevenue } from "../lib/data";

export default async function Home() {
  const revenues = await fetchRevenue();
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen">
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
    </div>
  );
}
