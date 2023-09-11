import { animate, motion } from "framer-motion";
import Image from "next/image";
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

export default function Sidebar() {
  const router = useRouter();

  return (
    <aside className="fixed left-0 top-14 mx-4 hidden h-full w-fit text-white sm:block">
      {options.map((i) => {
        return (
          <Link href={i.link} key={i.name}>
            <motion.div
              className={`${
                router.asPath == `${i.link}` ? "rounded-lg bg-[#232f3e]" : ""
              } my-10 flex h-10 w-10 cursor-pointer flex-col items-center justify-center gap-2 p-6 text-xs font-medium `}
            >
              <span className="min-h-[3vh]   min-w-[5vh]">
                <Image
                  src={`${i.src}`}
                  width={30}
                  height={30}
                  alt="error loading"
                  className={`${router.asPath == i.src ? "underline" : ""}`}
                />
              </span>
              <span className="text-xs font-extralight text-white">
                {i.name}
              </span>
            </motion.div>
          </Link>
        );
      })}
    </aside>
  );
}
