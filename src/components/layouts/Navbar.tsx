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
        <div className="flex  text-2xl font-medium">BookStore</div>
      </div>
      <div className="flex h-full w-fit items-center gap-2">
        <Profileicon />
      </div>
    </div>
  );
}
