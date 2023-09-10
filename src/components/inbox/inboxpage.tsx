import dayjs from "dayjs";
import Image from "next/image";
import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";
import { api } from "~/utils/api";

export default function InboxPage() {
  const { data, isLoading, refetch, isFetching } =
    api.sales.ProductInbox.useQuery();

  const {
    data: mutdata,
    mutate,
    isSuccess,
    isLoading: successLoading,
  } = api.sales.OrderacceptQuery.useMutation();

  const {
    mutate: rejectMutate,
    isLoading: rejectionLoading,
    isSuccess: rejectSuccess,
  } = api.sales.OrderrejectQuery.useMutation();

  useEffect(() => {
    const goandrefetch = async () => {
      await refetch();
    };
    void goandrefetch();
  }, [successLoading, rejectionLoading]);

  const confirmOrder = (id: string | undefined) => {
    if (id == undefined) {
      return;
    }
    mutate({ id: id });
    enqueueSnackbar("Order confirmed", { variant: "success" });
  };

  const rejectOrder = (id: string | undefined) => {
    if (id == undefined) {
      return;
    }
    rejectMutate({ id: id });
    enqueueSnackbar("Order rejected", { variant: "info" });
  };

  return (
    <>
      {isLoading ? (
        <p className="mt-5 animate-bounce">Loading...</p>
      ) : (
        <div className="flex flex-col gap-5">
          {data?.map((i) => {
            return (
              <div
                className="flex h-fit w-fit flex-col items-center justify-center bg-gray-800 p-2"
                key={i.id}
              >
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
                    onClick={() => {
                      void confirmOrder(i.id);
                    }}
                  >
                    Confirm
                  </button>
                  <button
                    className="min-w-[15vh] rounded-lg bg-white hover:bg-gray-300"
                    onClick={() => void rejectOrder(i.id)}
                  >
                    Reject
                  </button>
                </div>
                <div className="flex w-full justify-between">
                  <p
                    className="text-xs text-gray-300"
                    onClick={() => console.log(dayjs().diff(dayjs(i.orderdat)))}
                  >
                    time
                    {/* {time.hour.toString()} */}
                  </p>
                  <p className="text-xs text-gray-300">
                    sent by :{i.buyerdata?.name}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
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