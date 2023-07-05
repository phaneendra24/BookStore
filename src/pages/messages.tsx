import { useSession } from "next-auth/react";
import Signin from "./signin";

export default function Messages() {
  const { data: session } = useSession();
  return <div>{session ? <>messages</> : <Signin />}</div>;
}
