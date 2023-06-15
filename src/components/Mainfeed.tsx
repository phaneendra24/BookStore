import { api } from "~/utils/api";

export default function Mainfeed() {
  const { data, isLoading } = api.books.getAllBooks.useQuery();
  console.log(data);
  return <div className=""></div>;
}
