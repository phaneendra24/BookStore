import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import Signin from "../signin";

export default function CartIndex() {
  const { data: session } = useSession();
  const [processing, setprocessing] = useState(Boolean);
  const { data, refetch } = api.cart.getcartitems.useQuery();
  const { mutate, isLoading, isSuccess } = api.cart.cancelOrder.useMutation();

  if (!session) {
    return <Signin />;
  }

  if (!data) {
    return (
      <div className="">
        <div className="w-2/3 animate-pulse bg-[#252525]"></div>
        <div className="w-10/12 animate-pulse bg-[#252525]"></div>
      </div>
    );
  }
  const cancelOrder = (id: string | undefined) => {
    console.log(id);
    if (id != undefined) {
      mutate(id);
    }
  };
  if (isSuccess) {
    const goandrefetch = async () => {
      await refetch();
    };
    void goandrefetch();
  }

  return (
    <div
      className={`${
        isLoading ? " animate-pulse opacity-30" : ""
      } grid w-full grid-cols-1  gap-5 sm:grid-cols-3`}
    >
      {data.length == 0 ? (
        <div className="">No items in the cart</div>
      ) : (
        data.map((i) => {
          return (
            <div
              key={i.bookdata?.id}
              className="flex h-fit w-full flex-col items-center justify-center gap-5  p-3"
            >
              <span className="flex w-full flex-col items-start bg-[#252525] p-2">
                <h1>Book: {i.bookdata?.bookName}</h1>
                <span>price :{i.bookdata?.price}</span>
              </span>
              <div className="w-full bg-[#252525] p-1 text-center">
                {i.status}
              </div>
              <div
                onClick={() => cancelOrder(i.bookdata?.id)}
                className="w-full cursor-pointer bg-orange-700 py-2 text-center"
              >
                Cancel Order
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
