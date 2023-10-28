import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

import { motion } from "framer-motion";

import type { Books, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { enqueueSnackbar } from "notistack";
import Eachbookdata, {
  Getsellerdata,
  booklikestatus,
} from "~/components/data-queries/eachbookdata";
import Buyproduct from "~/components/mutations/likemutate";

type book = {
  data: Books;
  slug?: string | string[] | undefined;
  sellerdata?: User | null | undefined;
};

export const Sidebookcard = ({ data }: book) => {
  const router = useRouter();
  const querystring = router.query.slug as string;
  const utils = api.useContext();
  const { likestatus, refetch } = booklikestatus(querystring);

  const { data: session } = useSession();
  const {
    data: gets,
    mutate,
    isSuccess,
  } = api.update.updatinglike.useMutation({
    async onMutate(likestate) {
      await utils.update.userLikedstatus.cancel();

      const cachedata = utils.update.userLikedstatus.getData({
        id: querystring,
      });

      console.log(cachedata);

      utils.update.userLikedstatus.setData(
        { id: querystring },
        (prev) => !prev
      );
      return cachedata;
    },
    onError(err, newPost, ctx) {
      // If the mutation fails, use the context-value from onMutate
      utils.update.userLikedstatus.setData(
        { id: querystring },
        (prev) => !prev
      );
    },
    async onSettled() {
      // Sync with server once mutation has settled
      await utils.update.userLikedstatus.invalidate();
    },
  });

  const addTowishlist = () => {
    if (!session) {
      alert("please sigin first!");
      return;
    }
    mutate({ id: router.query.slug as string });
  };

  return (
    <>
      <div className="flex h-full min-h-[10vh] flex-col items-start justify-start gap-3 sm:w-1/3">
        <div className=" flex h-[70%] min-h-[50vh] w-full items-center justify-center bg-black sm:w-full md:w-[90%]">
          <Image
            src="/bookimage.svg"
            width={50}
            height={50}
            alt="image yet to be loaded"
          />
        </div>
        <div className=" 0 flex w-full justify-between text-black sm:w-[90%]">
          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.98,
            }}
            className={`flex w-40 items-center justify-between gap-2 rounded-lg p-1  py-2 text-white  ${
              likestatus ? "bg-pink-400" : " bg-[#ff84bb] text-white"
            }`}
            onClick={() => addTowishlist()}
          >
            <span className="w-fit">
              {/* <Image alt="not found" src="/love.svg" width={20} height={20} /> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={`${likestatus ? "#ffffff" : "#ff84bb"}`}
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="white"
                className="h-5 w-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </span>
            <span className="grow text-center">
              {likestatus ? "Added!" : "Add to wish"}
            </span>
          </motion.button>
          <button className=" rounded bg-white p-1">${data.price}</button>
        </div>
      </div>
    </>
  );
};

const Content = ({ data, slug, sellerdata }: book) => {
  const { data: productstatus, refetch } = api.sales.productstatus.useQuery(
    {
      bookid: slug as string,
      senderid: sellerdata?.id as string,
    },
    {
      refetchOnWindowFocus: false,
    }
  );
  const { data: session } = useSession();

  const { mutate, isSuccess, isLoading } = Buyproduct();

  const sendBuyReq = () => {
    if (!session) {
      alert("please sigin first!");
      return;
    }
    mutate({
      bookid: slug as string,
      senderid: sellerdata?.id as string,
    });
    enqueueSnackbar("Order Placed", { variant: "success" });
  };

  if (isSuccess) {
    const goandrefetch = async () => {
      await refetch();
    };
    void goandrefetch();
  }
  return (
    <div className="mt-2 flex w-full flex-col justify-between gap-2 sm:mt-0 sm:w-2/3  sm:gap-0 ">
      <h1 className="text-4xl font-medium">{data.bookName}</h1>
      <div>
        <span>Author</span>
        <span className="ml-14">: {data.authorname}</span>
      </div>
      <div>
        <span>Genre</span>
        <span className="ml-14">: {data.genre}</span>
      </div>
      <div>
        <span>Pages</span>
        <span className="ml-14">: {data.pages}</span>
      </div>
      <div className="flex">
        <span>Description</span>
        <span className="ml-5">: {data.synopsis}</span>
      </div>
      <div>
        <span>Published on</span>
        <span className="ml-5">: {data.createdAt.toString()}</span>
      </div>
      <div className="block sm:hidden">
        <span>Price</span>
        <span className="ml-5">: ${data.price}</span>
      </div>

      <button
        className={`${
          isLoading ? "animate-pulse " : ""
        }rounded-xl border-[2px] border-gray-500 bg-white py-1 text-black shadow-md`}
        onClick={() => void sendBuyReq()}
      >
        Buy
      </button>
    </div>
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
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
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
          strokeWidth="1.5"
          stroke="currentColor"
          aria-hidden="true"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
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
  const { sellerdata } = Getsellerdata(slug as string);

  const { data, isLoading } = Eachbookdata(slug as string);

  if (!data || !sellerdata || isLoading) {
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
      <div className="min-h-[80vh] rounded-lg bg-[#0e1015] p-3">
        <Eachnav data={data} />
        <div className="mt-6 flex w-full flex-col  sm:flex-row sm:gap-10">
          <Sidebookcard data={data} />
          <Content data={data} slug={slug} sellerdata={sellerdata} />
        </div>
      </div>

      <div className="h-[50vh]">
        <h1>Cutomer reviews</h1>
      </div>
    </div>
  );
}
