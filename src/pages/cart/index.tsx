import { useSession } from "next-auth/react";
import { useState } from "react";
import LoadingUi from "~/components/loadingui";
import { api } from "~/utils/api";
import Signin from "../signin";
import { motion } from "framer-motion";
import Image from "next/image";

export default function CartIndex() {
  const { data: session, status } = useSession();
  const [processing, setprocessing] = useState(Boolean);
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
        <>
          {data?.map((i) => {
            return (
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
                  <h1 className="text-xl">{i.bookdata?.bookName}</h1>
                  Price : <span className="">1200</span>
                  .Rs
                </div>
                <div className="flex w-full justify-center  text-center text-black">
                  <span className="w-[90%] rounded-md bg-white">
                    {i.status}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </>
      )}
    </div>
  );
}
