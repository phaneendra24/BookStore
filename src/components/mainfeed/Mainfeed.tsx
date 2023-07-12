import { api } from "~/utils/api";
import Link from "next/link";
import Image from "next/image";

import { motion } from "framer-motion";

const LoadingUi = () => {
  const list = [0, 1, 2, 3, 4, 5, 6, 7];
  return (
    <div className="no-scrollbar grid h-full w-full grow grid-cols-1 place-content-center gap-7 overflow-scroll px-2 py-4 sm:grid-cols-2 sm:px-0 md:grid-cols-3 xl:grid-cols-4">
      {list.map((i) => {
        return (
          <div
            key={i}
            className="flex h-full w-full animate-pulse flex-col gap-2"
          >
            <div className="h-70 bg-[#252525] sm:h-60"></div>
            <div className="h-4 w-2/3 bg-[#252525]"></div>
            <div className="h-4 w-1/3 bg-[#252525]"></div>
            <div className="flex w-full justify-center">
              <div className="h-8 w-[50%] rounded-md bg-[#252525]"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default function Mainfeed() {
  const { data, isLoading } = api.books.getAllBooks.useQuery();

  if (isLoading) {
    return <LoadingUi />;
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
