import { useSession } from "next-auth/react";
import Signin from "./signin";
import { api } from "~/utils/api";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Wishlist() {
  const { data: session } = useSession();
  const { data } = api.update.wishlistitems.useQuery();
  console.log(data);

  if (!data) {
    return null;
  }
  return (
    <div className="ml-2 sm:ml-10">
      {session ? (
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
                  <button className="rounded-sm bg-red-800 px-1">Remove</button>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <Signin />
      )}
    </div>
  );
}
