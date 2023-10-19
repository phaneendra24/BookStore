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
        <div className="mt-2 flex w-full flex-col gap-5 bg-[#0b0b0b]">
          {data?.length == 0 ? (
            <div>
              You have no order request for now 🫣
              <span className="text-5xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z"
                  />
                </svg>
              </span>
            </div>
          ) : (
            data?.map((i) => {
              return (
                <div
                  className="flex h-fit w-full flex-col items-center justify-center border-y-[1px] border-[#353535]  p-2"
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
                      onClick={() =>
                        console.log(dayjs().diff(dayjs(i.orderdat)))
                      }
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
            })
          )}
        </div>
      )}
    </>
  );
}
