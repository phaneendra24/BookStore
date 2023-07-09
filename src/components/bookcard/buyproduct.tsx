import { useEffect } from "react";
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
  console.log(productstatus);

  const { mutate, data } = api.sales.buyproduct.useMutation();

  const sendBuyReq = () => {
    mutate({
      bookid: slug,
      senderid: sellerid,
    });
  };

  useEffect(() => {
    const callthefetch = async () => {
      await refetch();
    };
    callthefetch();
  }, [mutate, data, refetch]);

  return (
    <button className="bg-orange-600 p-2" onClick={() => sendBuyReq()}>
      {productstatus ? <>Pending</> : <>Add to cart</>}
    </button>
  );
}
