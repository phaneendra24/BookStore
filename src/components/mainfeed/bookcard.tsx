import Image from "next/image";
import { api } from "~/utils/api";

export default function BooksCard() {
  const { data } = api.books.getAllBooks.useQuery();
  console.log(data);

  return (
    <>
      {data?.map((i) => {
        return (
          <div key={i.id} className="h-52 w-52 ">
            <Image
              src="/bookimage.jpeg"
              width={60}
              height={60}
              alt="no"
              className="h-56 w-96"
            />
            {i.authorname}
          </div>
        );
      })}
    </>
  );
}
