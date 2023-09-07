import { motion } from "framer-motion";
import Image from "next/image";
import { enqueueSnackbar } from "notistack";
import { api } from "~/utils/api";

export default function InboxPage() {
  const { data, isLoading, refetch } = api.sales.ProductInbox.useQuery();

  const { data: mutdata, mutate } = api.sales.OrderacceptQuery.useMutation();

  const confirmOrder = async () => {
    await refetch();
    enqueueSnackbar("Order confirmed", { variant: "success" });
  };
  const rejectOrders = async () => {
    enqueueSnackbar("rejected", { variant: "error" });
  };
  return (
    <>
      {isLoading ? (
        <p className="mt-5 animate-bounce">Loading...</p>
      ) : (
        <>
          {data?.map((i) => {
            return (
              <div className="flex h-fit w-fit flex-col items-center justify-center bg-gray-800 p-2">
                <div className="flex w-full items-center justify-between gap-2">
                  <span>
                    <h1>{i.bookdata?.bookName}</h1>
                    <p>by {i.bookdata?.authorname}</p>
                  </span>
                  <span className="h-fit w-fit rounded-sm bg-white text-black">
                    ${i.bookdata?.price}
                  </span>
                </div>
                <div className="flex w-full justify-between gap-5 text-black">
                  <button
                    className="min-w-[15vh] rounded-md bg-white p-1 hover:bg-gray-300"
                    onClick={confirmOrder}
                  >
                    Confirm
                  </button>
                  <button
                    className="min-w-[15vh] rounded-lg bg-white hover:bg-gray-300"
                    onClick={rejectOrders}
                  >
                    Reject
                  </button>
                </div>
                <div className="flex w-full justify-between">
                  <p className="text-xs">time</p>
                  <p className="text-xs text-gray-300">
                    sent by :{i.buyerdata?.name}
                  </p>
                </div>
              </div>
            );
          })}
        </>
      )}
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
