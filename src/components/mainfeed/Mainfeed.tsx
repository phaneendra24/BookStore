import { api } from "~/utils/api";
import Link from "next/link";
import Image from "next/image";

import { motion } from "framer-motion";
import LoadingUi from "../loadingui";

const Emptycard = () => {
  return (
    <div className=" flex h-full min-h-[50vh] items-center justify-center">
      No Data Found <span className="text-2xl">🥲</span>
    </div>
  );
};

export default function Mainfeed() {
  const { data, isLoading } = api.books.getAllBooks.useQuery();

  if (isLoading) {
    return <LoadingUi />;
  }

  if (data?.length == 0) {
    return <Emptycard />;
  }

  return (
    <div className="no-scrollbar  grid h-full w-full grow grid-cols-1 place-content-center gap-7 overflow-scroll px-2 py-4 sm:grid-cols-2 sm:px-0 md:grid-cols-3 xl:grid-cols-4">
      {data?.map((i) => {
        return (
          <Link href={`/book/${i.id}`} key={i.id}>
            <motion.div
              className="flex w-full cursor-pointer flex-col items-start justify-center gap-2 border-[1px] border-slate-600 pb-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{
                scale: 1,
              }}
            >
              <div className="flex h-72 w-full items-center justify-center bg-[#252525] sm:h-60">
                <Image
                  priority
                  src="/bookimage.svg"
                  width={60}
                  height={60}
                  alt="no"
                />
              </div>
              <div className="pl-2">
                <h1 className="text-xl">{i.bookName}</h1>
                Price : <span className="">1200</span>
                .Rs
              </div>
              <div className="flex w-full justify-center  text-center text-black">
                <span className="w-[90%] rounded-md bg-white">view</span>
              </div>
            </motion.div>
          </Link>
        );
      })}
    </div>
  );
}
