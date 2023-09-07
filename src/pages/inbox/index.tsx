import { useSession } from "next-auth/react";
import Signin from "../signin";
import InboxPage from "../../components/inbox/inboxpage";
import { GetServerSidePropsContext } from "next";
import { Getserverauthsession } from "~/server/customs/getserverauth";
import LoadingUi from "~/components/loadingui";

export default function Inbox() {
  const { data: session, status } = useSession();
  return (
    <div className="">
      {status == "loading" ? (
        <LoadingUi />
      ) : (
        <>
          {session ? (
            <div className="flex w-full gap-10">
              <div className="flex h-full min-h-[80vh] w-1/4 flex-col items-center rounded-xl bg-[#0e1015] px-4 py-2">
                <h1 className="text-xl text-blue-700">Pending Requests</h1>
                <InboxPage />
              </div>

              <div className="w-3/4 rounded-xl bg-[#0a0c0f] p-2">
                <h1 className="text-2xl text-blue-700">Manage your sales</h1>
              </div>
              {/* info about the  */}
            </div>
          ) : (
            <Signin />
          )}
        </>
      )}
    </div>
  );
}
