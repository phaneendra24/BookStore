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

const Sidebar = () => {
  const router = useRouter();

  return (
    <div className="hidden h-full  text-white sm:flex sm:gap-1  xl:gap-10">
      {options.map((i) => {
        return (
          <Link href={i.link} key={i.name}>
            <motion.div
              className={`${
                router.asPath == `${i.link}`
                  ? "underline underline-offset-8 "
                  : ""
              } flex items-center justify-center rounded-lg px-4 py-1 hover:bg-white hover:text-black`}
            >
              {i.name}
            </motion.div>
          </Link>
        );
      })}
    </div>
  );
};

interface IMyProps {
  menustatus: boolean;
  setmenustatus: Dispatch<SetStateAction<boolean>>;
}
export default function Navbar({ setmenustatus, menustatus }: IMyProps) {
  return (
    <div className="fixed top-0 z-10 flex  h-fit w-full items-center justify-between border-b-[0.1px] border-slate-600 bg-black px-10 py-[9px] ">
      <Link href="/">
        <div className=" text-2xl font-medium">Book shelf</div>
      </Link>
      <div className=" flex h-full grow items-center justify-end gap-2">
        <Sidebar />

        <Profileicon />
      </div>
    </div>
  );
}
