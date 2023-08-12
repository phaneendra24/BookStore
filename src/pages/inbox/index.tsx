import { useSession } from "next-auth/react";
import Signin from "../signin";
import InboxPage from "../../components/inbox/inboxpage";
import { GetServerSidePropsContext } from "next";
import { Getserverauthsession } from "~/server/customs/getserverauth";

export default function Inbox() {
  const { data: session } = useSession();
  return <div>{session ? <InboxPage /> : <Signin />}</div>;
}

// export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
//   const session = await Getserverauthsession(ctx);
//   return {
//     props: {
//       session: session,
//     },
//   };
// };
