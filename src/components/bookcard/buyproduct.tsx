import { api } from "~/utils/api";

type pageprops = {
  sellerid: string;
  slug: string;
};

export default function Buyproduct({ sellerid, slug }: pageprops) {
  const { mutate, data } = api.sales.buyproduct.useMutation();
  const sendBuyReq = () => {
    mutate({
      bookid: slug,
      senderid: sellerid,
    });
  };
  return (
    <button className="bg-orange-600 p-2" onClick={() => sendBuyReq()}>
      Add to cart
    </button>
  );
}
