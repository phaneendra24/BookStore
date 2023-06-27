import { api } from "~/utils/api";
import BooksCard from "./bookcard";

export default function Mainfeed() {
  const { data } = api.books.getAllBooks.useQuery();

  return (
    <div className="no-scrollbar mt-5 grid h-full w-full grow grid-cols-1 gap-3 overflow-scroll px-2 py-4 sm:grid-cols-2 lg:grid-cols-3">
      {data?.map((i) => {
        return <BooksCard key={i.id} id={i.id} bookname={i.bookName} />;
      })}
    </div>
  );
}
