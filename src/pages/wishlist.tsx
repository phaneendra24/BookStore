import { useSession } from "next-auth/react";
import Image from "next/image";
import LoadingUi from "~/components/loadingui";
import { api } from "~/utils/api";
import Signin from "./signin";

import Link from "next/link";

export const Eachnav = () => {
  return (
    <nav className="flex w-fit items-center justify-center gap-2 text-base text-gray-400">
      <Link href="/">
        <span className="flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            ></path>
          </svg>
          Home
        </span>
      </Link>
      <span>&gt;</span>
      <span className="flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          aria-hidden="true"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
          ></path>
        </svg>
      </span>
    </nav>
  );
};

const Noitems = () => {
  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center text-xl ">
      Dude! your wishlist is empty🫠
    </div>
  );
};

export default function Wishlist() {
  const { data: session } = useSession();
  const { data, refetch, isLoading } = api.update.wishlistitems.useQuery();
  const { mutate, isSuccess } = api.update.updatinglike.useMutation();

  if (!session) {
    return <Signin />;
  }

  if (isLoading || !data) {
    return <LoadingUi />;
  }

  const removelike = (id: string) => {
    mutate({ id: id });
  };

  if (isSuccess) {
    const goandrefetch = async () => {
      await refetch();
    };
    void goandrefetch();
  }
  return (
    <div className="min-h-[80vh] w-full bg-[#101218] p-3">
      <Eachnav />
      <div className="mt-5 h-full w-full ">
        <header className=" w-full rounded-lg bg-black p-2 ">
          <ul className="hidden w-full justify-between  sm:flex">
            <li className="w-32">Cancel</li>
            <li className="w-32">BookName</li>
            <li className="w-32">Price</li>
            <li className="w-32">status</li>
            <li className="w-32"></li>
          </ul>
          <div className="sm:hidden">Your Orders</div>
        </header>

        <div className="mt-5 w-full  ">
          <>{data.length == 0 && <Noitems />}</>
          {data?.map((i, j) => {
            return (
              <div key={j} className="my-4 rounded-lg bg-[#141822] p-2">
                <div className="flex w-full flex-col justify-between sm:flex-row ">
                  <div className="flex w-full  justify-end  sm:w-32 sm:justify-start">
                    <Image src="/trash.svg" alt="not" width={20} height={20} />
                  </div>
                  <div className="flex w-full  sm:w-32">
                    <div className="w-1/2  sm:hidden">BookName</div>

                    {i.bookName}
                  </div>
                  <div className="flex w-full  sm:w-32">
                    <div className="w-1/2  sm:hidden">Pricing</div>
                    {i.price}
                  </div>
                  <div className="flex w-full  sm:w-32">
                    <div className="w-1/2  sm:hidden">In stock</div>
                    Yes
                  </div>
                  <div className="flex w-full  sm:w-32 ">
                    <Link href={`/book/${i.id}`}>
                      <button className="rounded-lg bg-[#000000] p-2">
                        View
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
