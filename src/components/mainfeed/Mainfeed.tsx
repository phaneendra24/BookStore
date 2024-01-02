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
    <div className="py-5 px-10 no-scrollbar  grid h-fit min-h-[80vh] w-full  grid-cols-1 gap-7 overflow-scroll sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {data?.map((i) => {
        return (
          <Link href={`/book/${i.id}`} key={i.id}>
            <motion.div
              className=" hover:scale-105 rounded-lg flex w-full cursor-pointer flex-col items-start justify-center gap-2 pb-2"
              whileTap={{
                scale: 1,
              }}
            >
              <div className="flex rounded-md h-72 w-full items-center justify-center bg-[#252525] sm:h-60">
                <Image
                  priority
                  src="/bookimage.svg"
                  width={60}
                  height={60}
                  alt="no"
                />
              </div>
              <div className=" p-3 flex justify-between w-full">
                <h1 className="text-xl w-[90%]">{i.bookName}</h1>
                <h1 className="flex w-[10%] text-xs justify-center items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="000000" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 flex-shrink-0 h-4">
                    <path fill="white" stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                  </svg>4.5
                </h1>
              </div>
              <div className="mb-2 flex w-full justify-between gap-3 px-5  text-center">
                <span>
                  ₹{i.price}
                </span>
                <span className="text-xs text-[#a3a3a3]">- {i.authorname}</span>
              </div>
            </motion.div>
          </Link>
        );
      })}
    </div>
  );
}
