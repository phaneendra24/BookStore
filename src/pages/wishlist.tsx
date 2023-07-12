import { useSession } from "next-auth/react";
import Signin from "./signin";
import { api } from "~/utils/api";
import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";
import { Getserverauthsession } from "~/server/customs/getserverauth";
import { GetServerSidePropsContext } from "next";

export default function Wishlist() {
  const { data: session } = useSession();
  const { data } = api.update.wishlistitems.useQuery();
  const { mutate } = api.update.updatinglike.useMutation();

  if (!session) {
    return <Signin />;
  }

  if (!data) {
    return null;
  }

  return (
    <div className="ml-2 sm:ml-10">
      <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 lg:grid-cols-4">
        {data.map((i) => {
          return (
            <motion.div
              key={i.id}
              className="w-fit cursor-pointer rounded-md p-5 hover:bg-[#ffffff1a]"
              whileTap={{
                scale: 1,
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

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await Getserverauthsession(ctx);
  return {
    props: {
      session: session,
    },
  };
};
