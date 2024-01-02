import Image from "next/image";
import Profileicon from "../profileLogoutcard/profileicon";
import type { Dispatch, SetStateAction } from "react";
import { animate, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";

export const options = [
  {
    src: "/home.svg",
    name: "Home",
    link: "/",
    img: "home.svg",
  },
  {
    src: "/inbox.svg",
    name: "Trade",
    link: "/trade",
  },
  {
    src: "/message.svg",
    name: "Inbox",
    link: "/inbox",
  },
  {
    src: "/wishlist.svg",
    name: "WishList",
    link: "/wishlist",
  },
  {
    src: "/cart.svg",
    name: "Cart",
    link: "/cart",
  },
];


const Sidebar=()=> {
  const router = useRouter();

  return (
    <div className="hidden h-full  text-white sm:flex sm:gap-1  xl:gap-10">
      {options.map((i) => {
        return (
          <Link href={i.link} key={i.name}>
            <motion.div
              className={`${
                router.asPath == `${i.link}` ? "underline underline-offset-8 " : ""
              } px-4 py-1 flex items-center justify-center rounded-lg hover:bg-white hover:text-black`}
            >
                {i.name}
            </motion.div>
          </Link>
        );
      })}
    </div>
  );
}


interface IMyProps {
  menustatus: boolean;
  setmenustatus: Dispatch<SetStateAction<boolean>>;
}
export default function Navbar({ setmenustatus, menustatus }: IMyProps) {
  return (
    <div className="fixed top-0 bg-black px-10  z-10 flex h-fit w-full py-[9px] items-center justify-between border-b-[0.1px] border-slate-600 ">
        <div className=" text-2xl font-medium">Book shelf</div>
      <div className=" flex justify-end h-full grow items-center gap-2">
        <Sidebar />

        <Profileicon />
      </div>
    </div>
  );
}
