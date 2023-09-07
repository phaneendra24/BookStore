import { animate, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Sidebar() {
  const options = [
    {
      src: "/home.svg",
      name: "Home",
      link: "/",
    },
    {
      src: "/inbox.svg",
      name: "Trade",
      link: "/trade",
    },
    {
      src: "/Inbox.svg",
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
  const router = useRouter();

  return (
    <motion.div
      className="fixed top-14 h-full w-14   px-2 text-white"
      whileTap={{
        scale: 1,
      }}
    >
      {options.map((i) => {
        return (
          <Link href={i.link} key={i.name}>
            <motion.div
              className={`${
                router.asPath == `${i.link}` ? "rounded-lg bg-[#232f3e]" : ""
              } my-10 flex h-16 w-16 cursor-pointer flex-col items-center justify-center   text-xs font-thin `}
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
    </motion.div>
  );
}
