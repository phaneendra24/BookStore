import Image from "next/image";
import { number, string } from "zod";
import { api } from "~/utils/api";

import { motion } from "framer-motion";

type cardprop = {
  key: string;
  bookname: string;
};

export default function BooksCard({ key, bookname }: cardprop) {
  return (
    <motion.div
      key={key}
      className="hover: mt-5 flex cursor-pointer flex-col items-center justify-center"
      whileHover={{ scale: 1.1 }}
      whileTap={{
        scale: 1,
      }}
    >
      <Image
        src="/bookimage.jpeg"
        width={60}
        height={60}
        alt="no"
        className="h-60 w-56"
      />
      <h1 className="text-xl">{bookname}</h1>
      <p className="text-gray-400">by : wager</p>
      <div>
        Price : <span className="animate-bounce text-yellow-400">1200</span>.Rs
      </div>
    </motion.div>
  );
}
