import { motion } from "framer-motion";
import Image from "next/image";
import { api } from "~/utils/api";

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
            <div className="h-72 bg-[#252525] sm:h-60"></div>
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

export default function InboxPage() {
  const { data, isLoading } = api.sales.ProductInbox.useQuery();

  const { data: mutdata, mutate } = api.sales.OrderacceptQuery.useMutation();

  if (isLoading) {
    return <LoadingUi />;
  }
  return (
    <>
      {data?.map((i) => {
        return (
          <motion.div
            key={i.id}
            className="flex w-full  flex-col items-start justify-center gap-2 border-[1px] border-slate-600 pb-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{
              scale: 1,
            }}
          >
            <div className="relative flex h-72 w-full items-center justify-center bg-[#252525] sm:h-60">
              <Image
                priority
                src="/trash.svg"
                width={60}
                height={60}
                alt="no"
                className="absolute right-1 top-1 h-6 w-6 cursor-pointer "
              />
              <Image
                priority
                src="/bookimage.svg"
                width={60}
                height={60}
                alt="no"
              />
            </div>
            <div className="pl-2">
              <h1 className="text-xl">{i.buyerdata?.name}</h1>
              Price : <span className="">1200</span>
              .Rs
            </div>
            <div className="flex w-full justify-center  text-center text-black">
              <span className="w-[90%] rounded-md bg-white">SOLD</span>
            </div>
          </motion.div>
        );
      })}
    </>
  );
}

// <div className="no-scrollbar  grid h-full w-full grow grid-cols-1 place-content-center gap-7 overflow-scroll px-2 py-4 sm:grid-cols-2 sm:px-0 md:grid-cols-3 xl:grid-cols-4">
//   {data?.map((i) => {
//     return (
//       <div
//         key={i.bookdata?.id}
//         className="flex w-fit flex-col items-center justify-center bg-[#ffffff10]"
//       >
//         <h1>{i.bookdata?.bookName}</h1>
//         <h1>{i.buyerdata?.name}</h1>
//         <button
//           className="cursor-pointer bg-slate-600 p-2"
//           onClick={() => mutate({ id: i.id })}
//         >
//           {i.status == "PENDING" ? <>Accept</> : <>SOLD</>}
//         </button>
//       </div>
//     );
//   })}
// </div>
