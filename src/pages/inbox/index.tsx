import { useSession } from "next-auth/react";
import Sales from "~/components/inbox/Sales";
import LoadingUi from "~/components/loadingui";
import InboxPage from "../../components/inbox/inboxpage";
import Signin from "../signin";

export default function Inbox() {
  const { data: session, status } = useSession();
  return (
    <div className="h-full w-full">
      {status == "loading" ? (
        <LoadingUi />
      ) : (
        <>
          {session ? (
            <div className="h-full w-full  ">
              <div className="w-full border-b-[1px] border-[#353535] py-5 text-2xl">
                Manage your sales
              </div>
              <div className="relative flex w-full flex-col  md:flex-row ">
                <div className=" flex h-full min-h-[20vh] w-full flex-col items-start rounded-xl py-2 sm:min-h-[80vh]   sm:w-1/3 ">
                  <h1 className="text-xl ">Pending Requests</h1>
                  <InboxPage />
                </div>
                <Sales />
              </div>
            </div>
          ) : (
            <Signin />
          )}
        </>
      )}
    </div>
  );
}
