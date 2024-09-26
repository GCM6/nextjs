import User from "../user/page";
import styles from "./ui/home.module.css";

async function getUser() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  return res.json();
}

export default async function Home() {
    const user = await getUser();
  return (
      <div className="flex flex-col gap-4 items-center justify-center h-screen">
      <div className={ styles.shape }></div>
    <User />


<div className="w-6/12 shadow-cyan-500/20 shadow-lg rounded-lg p-4">
    { user.map((user: any, index: number) => (
      <div key={user.id}>
        <div className={ `text-lg ${index % 2 === 0 ? 'text-red-500' : 'text-blue-500'}` }>用户名： { user.name }</div>
      </div>
    ))}
</div>

    </div>
    );
}
