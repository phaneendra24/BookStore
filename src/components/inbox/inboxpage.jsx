import { api } from "~/utils/api";

export default function InboxPage() {
  const { data } = api.sales.productStatus.useQuery();

  return (
    <div className="h-40 w-full">
      {data?.map((i) => {
        return (
          <div
            key={i.bookdata?.id}
            className="flex w-fit flex-col items-center justify-center bg-[#ffffff10]"
          >
            <h1>{i.bookdata?.bookName}</h1>

            <h1>{i.buyerdata?.name}</h1>
            <button className="cursor-pointer bg-slate-600 p-2">
              {i.status == "PENDING" ? <>Accept</> : <></>}
            </button>
          </div>
        );
      })}
    </div>
  );
}
