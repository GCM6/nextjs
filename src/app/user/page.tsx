import { fetchUser } from "../lib/data";
import type {  User } from "../lib/definitions";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";

export default async function User() {

  const users = await fetchUser();
  

 return (
  <Card className="max-w-[400px]">
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

    <Divider />

    <CardBody>
      <p>下午好！</p>
    </CardBody>

    <CardFooter>
      <Link>
        <p>查看更多</p>
      </Link>
    </CardFooter>
  </Card>
 )
}
