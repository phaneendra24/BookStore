import { api } from "~/utils/api";
import Buyproduct from "./buyproduct";
import { Books } from "@prisma/client";

type myprops = {
  data: Books | null | undefined;
};
export default function Bookdata({ data }: myprops) {
  return (
    <div className="mt-10 flex w-full flex-col items-center justify-center gap-5">
      <div className="flex w-full flex-col gap-2 ">
        <div className="flex w-full">
          <span className="flex w-1/2 justify-center  text-2xl">BookName:</span>
          <span className="w-grow">:{data?.bookName}</span>
        </div>
        <div className="flex w-full">
          <span className="flex w-1/2 justify-center  text-2xl">Author:</span>
          <span className="w-grow">:{data?.authorname}</span>
        </div>
        <div className="flex w-full">
          <span className="flex w-1/2 justify-center  text-2xl">Genre:</span>
          <span className="w-grow">:{data?.genre}</span>
        </div>
        <div className="flex w-full">
          <span className="flex w-1/2 justify-center  text-2xl">
            Description:
          </span>
          <span className="w-grow">:{data?.synopsis}</span>
        </div>
        <div className="flex w-full">
          <span className="flex w-1/2 justify-center  text-2xl">Pages:</span>
          <span className="w-grow">:{data?.pages}</span>
        </div>
      </div>
    </div>
  );
}
