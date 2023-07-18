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
    <div className="no-scrollbar  grid h-full w-full grow grid-cols-1 place-content-center gap-7 overflow-scroll px-2 py-4 sm:grid-cols-2 sm:px-0 md:grid-cols-3 xl:grid-cols-4">
      {data?.map((i) => {
        return (
          <div
            key={i.bookdata?.id}
            className="flex w-fit flex-col items-center justify-center bg-[#ffffff10]"
          >
            <h1>{i.bookdata?.bookName}</h1>
            <h1>{i.buyerdata?.name}</h1>
            <button
              className="cursor-pointer bg-slate-600 p-2"
              onClick={() => mutate({ id: i.id })}
            >
              {i.status == "PENDING" ? <>Accept</> : <>SOLD</>}
            </button>
          </div>
        );
      })}
    </div>
  );
}
