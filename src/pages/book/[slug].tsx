"use client";
import { motion } from "framer-motion";
import Link from "next/link";

import { useRouter } from "next/router";
import { useEffect } from "react";
import { api } from "~/utils/api";

export default function Page() {
  const router = useRouter();
  const id = router.query.slug;
  const { mutate, data } = api.books.getDetailsofBook.useMutation();

  useEffect(() => {
    if (typeof id === "string") {
      const resp = mutate({
        id: id,
      });
    }
  }, [id]);

  return (
    <div className="flex w-full bg-green-600">
      <Link href="/">
        <motion.span className="cursor-pointer">
          <motion.svg
            whileHover={{
              scale: 1.5,
            }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6 text-slate-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </motion.svg>
        </motion.span>
      </Link>
    </div>
  );
}
