import Image from "next/image";
import Profileicon from "./profileicon";
import type { Dispatch, SetStateAction } from "react";

interface IMyProps {
  menustatus: boolean;
  setmenustatus: Dispatch<SetStateAction<boolean>>;
}
export default function Navbar({ setmenustatus, menustatus }: IMyProps) {
  return (
    <div className="fixed z-10 flex h-fit w-screen justify-between bg-black px-5 py-3 md:px-8 md:py-5">
      <div className="flex h-full items-center justify-start">
        <button className="" onClick={() => setmenustatus(!menustatus)}>
          <Image
            src="/menu.svg"
            width={0}
            height={0}
            alt="err load"
            className="flex h-10 w-fit items-center justify-center"
          />
        </button>
        <div className="flex  text-2xl font-medium">BookStore</div>
      </div>
      <div className="flex h-full w-fit items-center gap-2">
        <div className="relative ">
          <Image
            src="/searchicon.svg"
            alt="err loading"
            width={30}
            height={30}
            className="absolute  left-2 top-[20%] rounded-full"
          />
          <input
            type="text"
            className="w-28 rounded-md  border-[0.5px] border-gray-300 bg-transparent px-4 py-2 pl-10 outline-none sm:w-[30vh]"
            placeholder="search books"
          />
        </div>
        <Profileicon />
      </div>
    </div>
  );
}
