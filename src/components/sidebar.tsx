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
      src: "/messages.svg",
      name: "Messages",
      link: "/messages",
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
  if (router.asPath == `${options[0]?.link}`) {
    console.log(router.asPath);
  }

  return (
    <div className="fixed top-16  w-1/12 px-2 text-white md:px-8">
      {options.map((i) => {
        return (
          <Link href={i.link} key={i.name}>
            <div
              className={`${
                router.asPath == `${i.link}`
                  ? "rounded-sm bg-[#ffffff1a] p-1"
                  : ""
              } my-10 flex w-10 cursor-pointer flex-col items-center justify-center  text-xs font-thin hover:bg-[#292929]`}
            >
              <span className="">
                <Image
                  src={`${i.src}`}
                  width={30}
                  height={30}
                  alt="error loading"
                  className={`${router.asPath == i.src ? "underline" : ""}`}
                />
              </span>
              <span className="text-[10px]">{i.name}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
