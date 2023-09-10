import Image from "next/image";
import Profileicon from "./profileicon";
import type { Dispatch, SetStateAction } from "react";

interface IMyProps {
  menustatus: boolean;
  setmenustatus: Dispatch<SetStateAction<boolean>>;
}
export default function Navbar({ setmenustatus, menustatus }: IMyProps) {
  return (
    <div className="fixed z-10 flex h-fit w-full justify-between border-b-[0.1px] border-slate-600 bg-black px-4  py-3 md:py-5">
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
        <Profileicon />
      </div>
    </div>
  );
}
