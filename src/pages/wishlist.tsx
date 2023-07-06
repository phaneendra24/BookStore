import { useSession } from "next-auth/react";
import Signin from "./signin";
import { api } from "~/utils/api";

export default function wishlist() {
  const { data: session } = useSession();
  return <div>{session ? <>wishlist</> : <Signin />}</div>;
}
