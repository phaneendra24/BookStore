import { api } from "~/utils/api";

export default function Buyproduct() {
  const { data, mutate, isSuccess, isLoading } =
    api.sales.buyproduct.useMutation();

  return { data, mutate, isSuccess, isLoading };
}
