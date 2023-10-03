import { useSession } from "next-auth/react";
import LoadingUi from "~/components/loadingui";
import { api } from "~/utils/api";
import Signin from "../signin";
import { Eachnav } from "../wishlist";

const Noorder = () => {
  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center text-xl ">
      Dude! your cart is empty🫠
    </div>
  );
};

export default function CartIndex() {
  const { data: session, status } = useSession();
  const {
    data,
    refetch,
    isLoading: contentLoading,
  } = api.cart.getcartitems.useQuery();
  const { mutate, isLoading, isSuccess } = api.cart.cancelOrder.useMutation();

  if (status == "loading") {
    return <LoadingUi />;
  }

  if (!session) {
    return <Signin />;
  }

  const cancelOrder = (id: string | undefined) => {
    console.log(id);
    if (id != undefined) {
      mutate(id);
    }
  };
  // if (isSuccess) {
  //   const goandrefetch = async () => {
  //     await refetch();
  //   };
  //   void goandrefetch();
  // }

  if (!data) {
    return (
      <div>
        <LoadingUi />
      </div>
    );
  }

  return (
    <div className="h-full  min-h-[80vh] rounded-lg sm:bg-[#101218] sm:px-5">
      <Eachnav />

      <div className="mt-5 h-full w-full ">
        <header className=" w-full rounded-lg bg-black p-2 ">
          <ul className="hidden w-full justify-between  sm:flex">
            <li className="w-32">orderid</li>
            <li className="w-32">BookName</li>
            <li className="w-32">Price</li>
            <li className="w-32">status</li>
            <li className="w-32">Order Date</li>
          </ul>
          <div className="sm:hidden">Your Orders</div>
        </header>

        <div className="mt-5 w-full  ">
          <>{data.length == 0 && <Noorder />}</>
          {data?.map((i, j) => {
            return (
              <div key={j} className="my-4 rounded-lg bg-[#141822] p-2">
                <div className="flex w-full flex-col justify-between sm:flex-row ">
                  <div className="flex w-full  sm:w-32">
                    <div className="w-1/2  sm:hidden">S.no</div>
                    {j + 1}
                  </div>
                  <div className="flex w-full  sm:w-32">
                    <div className="w-1/2  sm:hidden">BookName</div>

                    {i.bookdata?.bookName}
                  </div>
                  <div className="flex w-full  sm:w-32">
                    <div className="w-1/2  sm:hidden">Pricing</div>

                    {i.bookdata?.price}
                  </div>
                  <div className="flex w-full  sm:w-32">
                    <div className="w-1/2  sm:hidden">Status</div>

                    {i.status}
                  </div>
                  <div className="flex w-full  sm:w-32">
                    <div className="w-1/2  sm:hidden">Date of order</div>
                    {}asdf
                  </div>
                </div>
                <div className="mt-4 flex w-full justify-center">
                  <button
                    className="w-32 rounded-lg bg-black p-2"
                    onClick={() => cancelOrder(i.orderid)}
                  >
                    {i.status == "PENDING" ? <>Cancel Order</> : <>Delivered</>}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
