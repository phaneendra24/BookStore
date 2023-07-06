import { useSession } from "next-auth/react";
import Signin from "./signin";

export default function Wishlist() {
  const { data: session } = useSession();
  return <div>{session ? <>wishlist</> : <Signin />}</div>;
}
