import { useRouter } from "next/router";
import { api } from "~/utils/api";

export default function Bookdata() {
  const router = useRouter();

  const { data, isLoading } = api.books.getEachBookData.useQuery(
    {
      id: router.query.slug as string,
    },
    {
      enabled: !!router.query.slug,
    }
  );
  if (!data || isLoading) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-5">
        <div className="h-8 w-[80%] animate-pulse bg-[#252525]"></div>
        <div className="h-60 w-full animate-pulse bg-[#252525]"></div>
      </div>
    );
  }

  const checkIn = () => {
    console.log("you bought the item");
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="h-full w-full">
        <div className="flex w-[90%] items-center justify-around">
          <span className="text-2xl">BookName:</span>
          <span>{data.bookName}</span>
        </div>
        <div className="flex w-[90%] items-center justify-around">
          <span className="text-2xl">Price:</span>
          <span>{data.price}</span>
        </div>
        <div className="flex w-[90%] items-center justify-around">
          <span className="text-2xl">Description:</span>
          <span>{data.synopsis}</span>
        </div>
        <div className="flex w-[90%] items-center justify-around">
          <span className="text-2xl">Genre:</span>
          <span>{data.genre}</span>
        </div>
        <div className="flex w-[90%] items-center justify-around">
          <span className="text-2xl">Author:</span>
          <span>{data.authorname}</span>
        </div>
        <div className="flex w-[90%] items-center justify-around">
          <span className="text-2xl">Pages:</span>
          <span>{data.pages}</span>
        </div>
      </div>

      <div className="flex w-[90%]">
        <button className="p-2">Like</button>
        <button className="bg-orange-600 p-2" onClick={() => checkIn()}>
          Add to cart
        </button>
      </div>
    </div>
  );
}
