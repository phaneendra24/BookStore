import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Bookdata from "~/components/bookcard/bookdata";
import { api } from "~/utils/api";

export default function Page() {
  const router = useRouter();
  const slug = router.query.slug;
  const { data, isLoading } = api.books.sellerdata.useQuery(
    {
      id: slug as string,
    },
    { enabled: !!router.query.slug }
  );

  if (!data) {
    return null;
  }

  return (
    <div className="flex w-full flex-col">
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
                src={data.image! ?? ""}
                alt="loading"
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
          </div>
        </div>
      </div>

      <Bookdata slug={slug} />
    </div>
  );
}
