import { api } from "~/utils/api";
import Wishlist from "./wishlistbtn";
import Buyproduct from "./buyproduct";

type myprops = {
  slug: string | string[] | undefined;
};
export default function Bookdata({ slug }: myprops) {
  const { data, isLoading } = api.books.getEachBookData.useQuery(
    slug as string,
    { enabled: !!slug }
  );
  const { data: likestatus } = api.update.userLikedstatus.useQuery(
    slug as string
  );

  if (!data || isLoading || !likestatus == null) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-5">
        <div className="h-8 w-[80%] animate-pulse bg-[#252525]"></div>
        <div className="h-60 w-full animate-pulse bg-[#252525]"></div>
      </div>
    );
  }
  return (
    <div className="mt-10 flex w-full flex-col items-center justify-center gap-5">
      <div className="flex w-full flex-col gap-2 ">
        <div className="flex w-full">
          <span className="flex w-1/2 justify-center  text-2xl">BookName:</span>
          <span className="w-grow">:{data.bookName}</span>
        </div>
        <div className="flex w-full">
          <span className="flex w-1/2 justify-center  text-2xl">Author:</span>
          <span className="w-grow">:{data.authorname}</span>
        </div>
        <div className="flex w-full">
          <span className="flex w-1/2 justify-center  text-2xl">Genre:</span>
          <span className="w-grow">:{data.genre}</span>
        </div>
        <div className="flex w-full">
          <span className="flex w-1/2 justify-center  text-2xl">
            Description:
          </span>
          <span className="w-grow">:{data.synopsis}</span>
        </div>
        <div className="flex w-full">
          <span className="flex w-1/2 justify-center  text-2xl">Pages:</span>
          <span className="w-grow">:{data.pages}</span>
        </div>
      </div>
      <div className="flex w-full">
        <div className="flex w-1/2 justify-center">
          <Wishlist likestatus={likestatus} />
        </div>
      </div>
    </div>
  );
}
