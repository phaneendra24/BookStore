import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

const Backdrop = ({
  setopen,
}: {
  setopen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="absolute left-0  z-50 flex h-full w-full items-start justify-center">
      <div className="flex h-fit w-full flex-col justify-between gap-5 rounded-md border-[1px]  border-[#3c3c3c] bg-black p-2 text-white sm:w-1/2">
        <div className=" flex  items-center justify-between">
          <span className="flex gap-2">
            Edit Book
            <Image src="edit.svg" alt="load failed" width={20} height={20} />
          </span>
          <button
            onClick={() => setopen((prev) => !prev)}
            className="rounded-sm p-1 hover:bg-[#232631]"
          >
            <Image src="/close.svg" alt="not found " width={20} height={20} />
          </button>
        </div>

        <div className="flex h-full w-full flex-col items-center gap-10">
          <div className="flex w-fit flex-col gap-5">
            <div className="flex w-full ">
              <div className="h-fit w-52 ">BookName</div>
              <input className="border-[1px] border-[#3c3c3c] bg-black outline-none" />
            </div>

            <div className="flex w-fit ">
              <div className="h-fit w-52 ">AuthorName</div>
              <input className="border-[1px] border-[#3c3c3c] bg-black outline-none" />
            </div>

            <div className="flex w-fit ">
              <div className="h-fit w-52 ">Price</div>
              <input className="border-[1px] border-[#3c3c3c] bg-black outline-none" />
            </div>

            <div className="flex w-fit ">
              <div className="h-fit w-52 ">Genre</div>
              <input className="border-[1px] border-[#3c3c3c] bg-black outline-none" />
            </div>

            <div className="flex w-fit ">
              <div className="h-fit w-52 ">Synopsis</div>
              <input className="border-[1px] border-[#3c3c3c] bg-black outline-none" />
            </div>
          </div>

          <div>
            <button className="w-52 rounded-md bg-white text-black">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Backdrop;
