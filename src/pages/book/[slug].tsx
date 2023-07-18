import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Bookdata from "~/components/bookcard/bookdata";
import Buyproduct from "~/components/bookcard/buyproduct";
import Wishlist from "~/components/bookcard/wishlistbtn";
import { api } from "~/utils/api";

export default function Page() {
  const router = useRouter();
  const slug = router.query.slug;

  // query for getting sellerdata
  const { data: sellerdata } = api.books.sellerdata.useQuery(
    {
      id: slug as string,
    },
    { enabled: !!router.query.slug }
  );

  // query for getting wishliststatus

  const { data: wishliststatus } = api.update.userLikedstatus.useQuery(
    slug as string
  );

  // query for books information

  const { data, isLoading } = api.books.getEachBookData.useQuery(
    slug as string,
    { enabled: !!slug }
  );
  // likestatus querying
  const { data: likestatus } = api.update.userLikedstatus.useQuery(
    slug as string
  );
  if (!data || !sellerdata || isLoading || !likestatus == null) {
    return (
      <div className="my-10 flex w-full flex-col items-center justify-center gap-5 px-5">
        <div className="flex h-8 w-full animate-pulse justify-between">
          <div className="w-[20%] animate-pulse rounded-lg bg-[#252525]"></div>
          <div className="w-[30%] animate-pulse rounded-lg bg-[#252525]"></div>
        </div>
        <div className="flex w-full flex-col justify-between gap-10">
          <div className="h-10 w-[30%] animate-pulse rounded-lg bg-[#252525]"></div>
          <div className="h-40 grow animate-pulse rounded-lg bg-[#252525]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col">
      <div className=" flex h-fit w-full items-center justify-between sm:px-10">
        <Link href="/">
          <motion.button
            whileHover={{
              scale: 1.3,
            }}
            className="flex w-fit cursor-pointer rounded-lg  py-1 pr-2 hover:bg-[#252525] "
          >
            <svg
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
            </svg>
            Back
          </motion.button>
        </Link>
        <div className="flex w-fit gap-2 rounded-md p-2 hover:bg-[#252525]">
          <div
            className={`h-10 w-10 ${
              isLoading ? "animate-pulse" : ""
            } rounded-full bg-gray-600`}
          >
            <Image
              src={sellerdata.image! ?? ""}
              alt="loading"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col text-xs">
            {sellerdata?.name}
            <span className="text-xs">{sellerdata?.email}</span>
          </div>
        </div>
      </div>
      <Bookdata data={data} />
      <div className="mt-5  flex justify-center">
        <div className="flex w-1/2 justify-center">
          <Wishlist likestatus={likestatus} />
        </div>
        <div className="flex w-1/2 justify-start">
          <Buyproduct sellerid={data.id} slug={slug as string} />
        </div>
      </div>
    </div>
  );
}
