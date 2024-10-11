
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Skeleton} from "@nextui-org/react";


import { fetchUser } from "../lib/data";
import type {  User } from "../lib/definitions";

export default async function User({ searchParams }: { searchParams: { query: string } }) {

  const query = searchParams?.query || ''

  console.log("查询条件", query);
  

  const users = await fetchUser();
  

 return (
  <Card className="max-w-[400px]">

  <Skeleton isLoaded={users.length > 0}>
    <CardHeader className="flex gap-3">
      <Image
        alt="nextui logo"
        height={36}
        width={36}
        src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
      />
      <div className="flex flex-col">
        <p className="text-md">{users[0].name}</p>
        <p className="text-small text-default-500">{users[0].email}</p>
      </div>
    </CardHeader>
    </Skeleton>
   

    <Divider />

    <CardBody>
      <p>下午好！{ users.length }{ query }</p>
    </CardBody>

    <CardFooter>
      <Link>
        <p className="cursor-pointer">查看更多</p>
      </Link>
    </CardFooter>
  </Card>
 )
}
