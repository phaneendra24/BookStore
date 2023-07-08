import { useSession } from "next-auth/react";
import Signin from "../signin";

export default function Inbox() {
  const { data: session } = useSession();
  return <div>{session ? <div>inbox</div> : <Signin />}</div>;
}
