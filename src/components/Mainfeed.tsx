import { api } from "~/utils/api";

export default function Mainfeed() {
  const { data, isLoading } = api.books.getAllBooks.useQuery();
  console.log(data);
  return (
    <div className="">
      asdf
      {isLoading ? (
        <div className="h-32 animate-pulse"></div>
      ) : (
        <div className="h-32 w-full">a</div>
      )}
    </div>
  );
}
