'use client';

import { useRouter, usePathname } from "next/navigation";

export default function User() {
  const router = useRouter();
  const pathname = usePathname();

  console.log(123,pathname);
  
 return (
  <button type="button" onClick={() => router.push('/')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  User Client
</button>
 )
}
