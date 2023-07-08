import { api } from "~/utils/api";

export default function Buyproduct() {
  const { mutate, data } = api.sales.buyproduct.useMutation();
  return <button className="bg-orange-600 p-2">Add to cart</button>;
}
