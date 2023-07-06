import Image from "next/image";

import { motion } from "framer-motion";
import Link from "next/link";

type cardprop = {
  id: string;
  bookname: string;
};

export default function BooksCard({ id, bookname }: cardprop) {
  return (
    <Link href={`/book/${id}`}>
      <motion.div
        className="hover: mt-5 flex cursor-pointer flex-col items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{
          scale: 1,
        }}
      >
        <Image
          priority
          src="/bookimage.jpeg"
          width={60}
          height={60}
          alt="no"
          className="h-60 w-56"
        />
        <h1 className="text-xl">{bookname}</h1>
        <p className="text-gray-400">{}</p>
        <div>
          Price : <span className="animate-bounce text-orange-700">1200</span>
          .Rs
        </div>
      </motion.div>
    </Link>
  );
}
