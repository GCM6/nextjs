import {Image} from "@nextui-org/react";
import Search from "@/components/Search";
import { Suspense } from 'react'

export default function Header() {
  return (
    <header className="fixed z-50 top-0 flex justify-between align-middle border-b border-slate-200 min-w-[320px] bg-white bg-opacity-70 backdrop-blur-sm w-full">
       <div className="pl-6 h-16 flex items-center">
       <Image
        alt="nextui logo"
        height={24}
        width={24}
        src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
      />
      <span className="ml-2 font-bold">Nextjs</span>
       </div>
       <div className="pr-6 h-16 flex items-center">
       <Suspense>
        <Search placeholder="Search" />
        </Suspense>
       </div>
    </header>
  )
}