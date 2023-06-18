import Image from "next/image";
import Profileicon from "./profileicon";

export default function Navbar() {
  return (
    <div className="flex h-24 w-full items-center justify-between bg-black py-3 text-white">
      <div className="flex h-full items-center justify-start">
        <Image
          src="/menu.svg"
          width={0}
          height={0}
          alt="err load"
          className="flex h-10 w-fit items-center justify-center"
        />
        <div className="flex  text-2xl font-medium">BookStore</div>
      </div>
      <div className="flex h-full items-center justify-between gap-10">
        <div className="relative">
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
