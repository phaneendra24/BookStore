import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Image from "next/image";
import LoadingUi from "~/components/loadingui";
import { api } from "~/utils/api";
import Signin from "./signin";
import type { Books, User } from "@prisma/client";

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

export default function Wishlist() {
  const { data: session } = useSession();
  const { data, refetch, isLoading } = api.update.wishlistitems.useQuery();
  const { mutate, isSuccess } = api.update.updatinglike.useMutation();

  if (!session) {
    return <Signin />;
  }

  if (isLoading) {
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
    <div className="">
      <Eachnav />
      <div className="no-scrollbar  grid h-full w-full grow grid-cols-1 place-content-center gap-7 overflow-scroll py-4 sm:grid-cols-2  md:grid-cols-3 xl:grid-cols-4">
        {!data || data.length == 0 ? (
          <div className="flex w-full items-center justify-center ">
            No Records Found
          </div>
        ) : (
          <>
            {data.map((i) => {
              return (
                <motion.div
                  key={i.id}
                  className="w-fit  rounded-md p-5 "
                  whileHover={{
                    scale: 1.02,
                  }}
                >
                  <div className="h-72 w-full bg-[#252525]">
                    <Image
                      priority
                      src="/bookimage.svg"
                      width={60}
                      height={60}
                      alt="no"
                      className="h-6 w-6 rounded-md"
                    />
                  </div>
                  <h1 className="text-xl">{i.bookName}</h1>
                  <p className="text-gray-400">{i.authorname}</p>
                  <div className="flex justify-between">
                    <span className="">
                      <span className="animate-bounce text-orange-700">
                        Price :{i.price}
                      </span>
                      .Rs
                    </span>
                    <button
                      type="button"
                      value={i.bookid}
                      className="rounded-sm bg-red-800 px-1"
                      onClick={() => removelike(i.id)}
                    >
                      Remove
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
