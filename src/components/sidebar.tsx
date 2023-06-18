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
  console.log(router.asPath);

  return (
    <div className="fixed top-16 w-1/12 bg-black px-2 text-white md:px-8">
      {options.map((i) => {
        return (
          <Link href={i.link} key={i.name}>
            <div className="my-10 flex w-fit cursor-pointer flex-col items-center justify-center  text-xs font-thin hover:border-b-2 hover:bg-[#292929] hover:decoration-black">
              <span className="">
                <Image
                  src={`${i.src}`}
                  width={30}
                  height={30}
                  alt="error loading"
                  className={`${router.asPath == i.src ? "underline" : ""}`}
                />
              </span>
              <span>{i.name}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
