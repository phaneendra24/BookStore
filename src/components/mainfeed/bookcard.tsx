import Image from "next/image";
import { api } from "~/utils/api";

export default function BooksCard() {
  const { data, isLoading } = api.books.getAllBooks.useQuery();
  console.log(data);

  return (
    <div className="grid h-full w-full grow grid-cols-1 overflow-scroll sm:grid-cols-3">
      {isLoading ? (
        <>
          <div className="mb-5 flex flex-col items-center justify-center">
            <div className=" mb-5 h-52  w-64 animate-pulse bg-[#252525]"></div>
            <div className="h-6 w-44 bg-[#252525]"></div>
          </div>
          <div className="mb-5 flex flex-col items-center justify-center">
            <div className=" mb-5 h-52  w-64 animate-pulse bg-[#252525]"></div>
            <div className="h-6 w-44 bg-[#252525]"></div>
          </div>
          <div className="mb-5 flex flex-col items-center justify-center">
            <div className=" mb-5 h-52  w-64 animate-pulse bg-[#252525]"></div>
            <div className="h-6 w-44 bg-[#252525]"></div>
          </div>
          <div className="mb-5 flex flex-col items-center justify-center">
            <div className=" mb-5 h-52  w-64 animate-pulse bg-[#252525]"></div>
            <div className="h-6 w-44 bg-[#252525]"></div>
          </div>
          <div className="mb-5 flex flex-col items-center justify-center">
            <div className=" mb-5 h-52  w-64 animate-pulse bg-[#252525]"></div>
            <div className="h-6 w-44 bg-[#252525]"></div>
          </div>
          <div className="mb-5 flex flex-col items-center justify-center">
            <div className=" mb-5 h-52  w-64 animate-pulse bg-[#252525]"></div>
            <div className="h-6 w-44 bg-[#252525]"></div>
          </div>
        </>
      ) : (
        data?.map((i) => {
          return (
            <div key={i.id} className="h-fit w-fit ">
              <Image
                src="/bookimage.jpeg"
                width={60}
                height={60}
                alt="no"
                className="h-60 w-64"
              />
              {i.bookName}
            </div>
          );
        })
      )}
    </div>
  );
}
