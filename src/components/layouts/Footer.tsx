import Image from "next/image";
import { options } from "./sidebar";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="fixed bottom-0 flex h-14 w-full items-center  justify-around bg-green-300 sm:hidden">
      {options.map((i) => {
        return (
          <button>
            <Link href={i.link}>
              <Image src={i.src} alt="img" width={20} height={20} />
            </Link>
          </button>
        );
      })}
    </div>
  );
};

export default Footer;
