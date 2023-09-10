import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

import type { Books } from "@prisma/client";

type book = {
  data: Books;
};

export const Sidebookcard = ({ data }: book) => {
  return (
    <>
      <div className="flex h-full min-h-[10vh] w-1/3 flex-col items-start justify-start gap-3">
        <div className=" flex h-[70%] w-[80%] items-center justify-center bg-black">
          <Image
            src="/bookimage.svg"
            width={50}
            height={50}
            alt="image yet to be loaded"
          />
        </div>
        <p className="">{data.bookName}</p>
        <p>by {data.authorname}</p>
      </div>
    </>
  );
};

export const Eachnav = ({ data }: book) => {
  return (
    <nav className="flex w-fit items-center justify-center gap-2 text-base text-gray-400">
      <Link href="/">
        <span className="flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
            className="h-4 w-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            ></path>
          </svg>
          Home
        </span>
      </Link>

      <span>&gt;</span>
      <span className="flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          aria-hidden="true"
          className="h-4 w-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
          ></path>
        </svg>
        {data.bookName}
      </span>
    </nav>
  );
};
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
    <div className="flex h-full w-full flex-col rounded-lg">
      <div className="h-[80vh] rounded-lg bg-[#0e1015] p-3">
        <Eachnav data={data} />
        <div className="mt-6 flex h-full min-h-[10vh] w-full">
          <Sidebookcard data={data} />
          <div className="min-h-[10vh] w-2/3 bg-violet-400"></div>
        </div>
      </div>

      <div className="h-[50vh]">
        <h1>Cutomer reviews</h1>
      </div>
    </div>
  );
}

// <Link href="/">
// <motion.button
//   whileHover={{
//     scale: 1.3,
//   }}
//   className="flex w-fit cursor-pointer rounded-lg  py-1 pr-2 hover:bg-[#252525] "
// >
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     className="h-6 w-6 text-slate-400"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M15.75 19.5L8.25 12l7.5-7.5"
//     />
//   </svg>
//   Back
// </motion.button>
// </Link>
