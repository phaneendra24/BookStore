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
            <div>
              <div>asdfsdf</div>
              {/* info about the  */}
              <div className="no-scrollbar  grid h-full w-full grow grid-cols-1 place-content-center gap-7 overflow-scroll px-2 py-4 sm:grid-cols-2 sm:px-0 md:grid-cols-3 xl:grid-cols-4">
                <InboxPage />
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
