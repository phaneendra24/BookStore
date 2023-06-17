import Image from "next/image";
import Profileicon from "./profileicon";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between bg-[#252525] py-3 text-white">
      <div className="flex h-full justify-start">
        <Image
          src="/menu.svg"
          width={0}
          height={0}
          alt="err load"
          className="flex h-10 w-fit items-center justify-center"
        />
        <div className="flex h-10  text-2xl font-medium">BookStore</div>
      </div>
      <div className=" flex grow justify-between ">
        <div className="relative ml-32 grow">
          <Image
            src="/searchicon.svg"
            alt="err loading"
            width={30}
            height={30}
            className="absolute left-2 top-[20%] rounded-full"
          />
          <input
            type="text"
            className="w-[90%] rounded-md border-[0.5px] border-gray-300 bg-transparent px-4 py-2 pl-10 outline-none sm:w-[70%]"
            placeholder="search books"
          />
        </div>
        <Profileicon />
      </div>
    </div>
  );
}
