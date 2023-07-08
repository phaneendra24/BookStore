import { useSession } from "next-auth/react";
import Signin from "../signin";
import InboxPage from "../../components/inbox/inboxpage";

export default function Inbox() {
  const { data: session } = useSession();
  return <div>{session ? <InboxPage /> : <Signin />}</div>;
}
