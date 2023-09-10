import Image from "next/image";
import { options } from "./sidebar";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="fixed bottom-0 flex h-14 w-full items-center justify-around bg-black px-4 sm:hidden">
      {options.map((i) => {
        return (
          <button key={i.name} className="">
            <Link href={i.link}>
              <Image src={i.src} alt="img" width={30} height={30} />
            </Link>
          </button>
        );
      })}
    </div>
  );
};

export default Footer;
