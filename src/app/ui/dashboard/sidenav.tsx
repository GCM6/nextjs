import Link from "next/link";

export default function Sidenav() {
  const menu = [
    {
      name: "首页",
      path: "/",
    },
    {
      name: "用户",
      path: "/user",
    },
  ];
  return (
    <div className="w-full pt-[30px]">
      <div className="w-full h-full bg-white">
        <div className="w-full h-full bg-white">
          <div className="w-full h-full bg-white">
            {menu.map((item, index) => (
              <Link href={item.path}>
                <div
                  className="w-full p-4 hover:bg-slate-100 cursor-pointer"
                  key={index}
                >

                {item.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
