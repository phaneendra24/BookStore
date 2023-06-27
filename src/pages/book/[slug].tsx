import { motion } from "framer-motion";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import Bookdata from "~/components/bookdata";

import { api } from "~/utils/api";

type ptype = {
  slug: string;
};

export default function Page({ slug }: ptype) {
  const { data, isLoading } = api.books.sellerdata.useQuery({
    id: slug,
  });
  const profileurl = data?.image!;
  return (
    <div className="flex w-full">
      <div className="flex w-full justify-between">
        <Link href="/">
          <motion.span className="flex cursor-pointer">
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
            Back
          </motion.span>
        </Link>
        <div className="flex">
          <div className="flex flex-col text-xs">
            {data?.name}
            <span className="text-xs">{data?.email}</span>
          </div>
          <div
            className={`h-10 w-10 ${
              isLoading ? "animate-pulse" : ""
            } rounded-full bg-gray-600`}
          >
            {isLoading ? (
              <></>
            ) : (
              <Image
                src={profileurl}
                alt="bad"
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
          </div>
        </div>
      </div>

      <Bookdata id={slug} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<{}> = async ({ query }) => {
  const slug = await query.slug;

  return { props: { slug } };
};
