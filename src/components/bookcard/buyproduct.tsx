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
  const { mutate, data, isSuccess } = api.sales.buyproduct.useMutation();
  const sendBuyReq = async () => {
    mutate({
      bookid: slug,
      senderid: sellerid,
    });
  };
  if (isSuccess) {
    refetch();
  }

  return (
    <motion.button
      whileTap={{
        scale: 1.2,
      }}
      className="bg-orange-600 p-2"
      onClick={() => void sendBuyReq()}
    >
      {productstatus ? <>Pending</> : <>Add to cart</>}
    </motion.button>
  );
}
