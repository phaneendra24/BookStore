import Image from "next/image";
import Link from "next/link";

export default function Sidebar() {
  const options = [
    {
      src: "/home.svg",
      name: "Home",
      link: "/",
    },
    {
      src: "/inbox.svg",
      name: "Inbox",
      link: "/inbox",
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
  return (
    <div className="static text-white">
      {options.map((i) => {
        return (
          <Link href={i.link}>
            <div
              key={i.name}
              className="my-10 flex w-fit cursor-pointer flex-col items-center justify-center  text-xs font-thin hover:border-b-2 hover:bg-[#292929] hover:decoration-black"
            >
              <span>
                <Image
                  src={`${i.src}`}
                  width={30}
                  height={30}
                  alt="error loading"
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
