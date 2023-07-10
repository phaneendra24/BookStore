import { motion } from "framer-motion";
import { api } from "~/utils/api";

type pageprops = {
  sellerid: string;
  slug: string;
};

export default function Buyproduct({ sellerid, slug }: pageprops) {
  const { data: productstatus, refetch } = api.sales.productstatus.useQuery({
    bookid: slug,
    senderid: sellerid,
  });
  const { mutate, isSuccess, isLoading } = api.sales.buyproduct.useMutation();
  const sendBuyReq = () => {
    mutate({
      bookid: slug,
      senderid: sellerid,
    });
  };
  if (isSuccess) {
    const goandrefetch = async () => {
      await refetch();
    };
    void goandrefetch();
  }

  return (
    <motion.button
      whileTap={{
        scale: 1.2,
      }}
      className={`flex min-w-[8rem] items-center justify-center bg-orange-600 p-2 ${
        isLoading ? "hover:cursor-wait" : ""
      }`}
      onClick={() => void sendBuyReq()}
    >
      {isLoading ? (
        <div className="h-5 w-5 animate-spin rounded-full border-l-2"></div>
      ) : (
        <>{productstatus ? <>Pending</> : <>Add to cart</>}</>
      )}
    </motion.button>
  );
}
