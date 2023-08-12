import { useSession } from "next-auth/react";
import Signin from "./signin";
import { api } from "~/utils/api";
import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";
import { Getserverauthsession } from "~/server/customs/getserverauth";
import type { GetServerSidePropsContext } from "next";
import LoadingUi from "~/components/loadingui";

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

  if (!data || data.length == 0) {
    return (
      <div className="flex w-full items-center justify-center ">
        <Image
          src="/db.svg"
          width={60}
          height={60}
          className="h-32 w-32 text-slate-400"
          alt="err"
        />
        No Records Found
      </div>
    );
  }
  return (
    <div className="ml-2 sm:ml-10">
      <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 lg:grid-cols-4">
        {data.map((i) => {
          return (
            <motion.div
              key={i.id}
              className="w-fit  rounded-md p-5 "
              whileHover={{
                scale: 1.02,
              }}
            >
              <Image
                priority
                src="/bookimage.jpeg"
                width={60}
                height={60}
                alt="no"
                className="h-52 w-72 rounded-md"
              />
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
      </div>
    </div>
  );
}

// export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
//   const session = await Getserverauthsession(ctx);
//   return {
//     props: {
//       session: session,
//     },
//   };
// };
