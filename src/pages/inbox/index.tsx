import { useSession } from "next-auth/react";
import LoadingUi from "~/components/loadingui";
import InboxPage from "../../components/inbox/inboxpage";
import Signin from "../signin";
import Filetercomponent from "~/components/inbox/filtermenu";
import { useRef } from "react";

const Content = () => {
  return <div>content</div>;
};

const Sales = () => {
  return (
    <div className="w-full grow border-[#353535] px-3 py-2 sm:min-h-[80vh]  sm:w-2/3 sm:border-l-[1px]">
      <header className="flex gap-5  text-xl ">
        Sales
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
      </header>
      <p className="text-xs text-gray-600">
        (You can manage book you sold here)
      </p>
      {/* content */}
      <div className="mt-2 w-full">
        <Filetercomponent />
        <Content />
      </div>
    </div>
  );
};

export default function Inbox() {
  const { data: session, status } = useSession();
  return (
    <div className="h-full">
      {status == "loading" ? (
        <LoadingUi />
      ) : (
        <>
          {session ? (
            <div className="relative h-full  w-full  sm:flex-col">
              <div className="w-full border-b-[1px] border-[#353535] py-5 text-2xl">
                Manage your sales
              </div>
              <div className="flex w-full flex-col sm:flex-row ">
                <div className="flex h-full min-h-[20vh] w-full flex-col items-center rounded-xl py-2 sm:min-h-[80vh]   sm:w-1/3 ">
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
