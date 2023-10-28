import { api } from "~/utils/api";

export default function Buyproduct() {
  const { mutate, isSuccess, isLoading } = api.sales.buyproduct.useMutation();

  return { mutate, isSuccess, isLoading };
}
