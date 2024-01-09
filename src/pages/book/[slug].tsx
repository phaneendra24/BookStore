import Image from "next/image";
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
import Buyproduct from "~/components/mutations/buyingmutate";
import Eachnav from "~/components/titleeachnav";
import { format } from "date-fns";
import React, { useEffect } from "react";


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
        <div className=" flex h-[70%] bg-[#252525] min-h-[50vh] w-full items-center justify-center rounded-lg sm:w-full md:w-[90%]">
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
            className={`flex w-fit gap-2 items-center  rounded-lg p-1  py-2 text-white 
              `}
            onClick={() => addTowishlist()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={`${likestatus ? "#6c63ff" : ""}`}
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke={likestatus ? "" : "white"}
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
            <span className="grow text-center">
              {likestatus ? "Added!" : "Add to wish"}
            </span>
          </motion.button>
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

  const { data: buydata, mutate, isSuccess, isLoading } = Buyproduct();

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
      <div className="text-[#a3a3a3]">
        <p className="">Author : {data.authorname}</p>
        <div>
          {data.synopsis}
        </div>
      </div>

      <h1 className="text-2xl">₹ {data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.00</h1>

      <div className=" text-center w-full flex">
        <span className="w-1/3  border-r-2">
          Genre:
          <span className="text-[#a3a3a3]">
            {data.genre}
          </span>
        </span>
        <span className="w-1/3  border-r-2">
          Pages:
          <span className="text-[#a3a3a3]">
            {data.pages}
          </span>
        </span>
        <span className="w-1/3 ">
          Publised:
          <span className="text-[#a3a3a3]">
            {format(data.createdAt, "PPP")}
          </span>
        </span>

      </div>



      <div className="w-full rounded-lg border-[1px] bg-white flex">
        <button className="w-1/2 text-black">Add to wishlist</button>
        <button
          disabled={isLoading || buydata == false ? true : false}
          className={`${isLoading || buydata == false ? 'cursor-not-allowed' : 'cursor-pointer'}  ${isLoading ? "animate-pulse " : ""
            } w-1/2  bg-black  py-1 text-white shadow-md`}
          onClick={() => void sendBuyReq()}
        >
          {
            isLoading ?
              "processing"
              : "Buy"
          }
        </button>
      </div>

    </div>
  );
};

export default function Page() {
  const router = useRouter();
  const slug = router.query.slug;
  const session = useSession()
  // query for getting sellerdata
  const { sellerdata } = Getsellerdata(slug as string);
  const { data, isLoading } = Eachbookdata(slug as string);
  // const {data:}reviews} = api.review.
  const { mutate } = api.review.postReview.useMutation()

  const { data: reviews } = api.review.getReviews.useQuery({ id: slug as string }, {
    enabled: !!slug,
    refetchOnWindowFocus: false,
  })


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
  const post = (e: React.FormEvent) => {
    e.preventDefault()
    mutate({
      review: "asdf",
      id: slug as string,
    })

  }

  return (
    <div className="px-10 flex h-full w-full flex-col rounded-lg">
      <div className="min-h-[80vh] rounded-lg p-3">
        <Eachnav />
        <div className="mt-6 flex w-full flex-col  sm:flex-row sm:gap-10">
          <Sidebookcard data={data} />
          <Content data={data} slug={slug} sellerdata={sellerdata} />
        </div>
      </div>
      <div className="h-[50vh] flex border-t-[1px] pt-5 border-[#475569]">
        {/* reivew stats div */}
        <div className="w-1/3">
          <h1 className="text-2xl">Reviews</h1>
        </div>

        {/* comments div */}
        <div className="w-full flex flex-col ">
          <div className="w-full flex justify-center gap-3">
            <Image className="h-fit rounded-full w-10" src={session.data?.user.image as string} alt="failed" width={20} height={20} />
            <form action="" onSubmit={(e) => post(e)} className="border-[1px] w-full border-[#a3a3a3] flex justify-between h-fit">
              <input placeholder="leave a review" className="w-full h-fit p-2 outline-none  bg-transparent " />
              <button type="submit" className="bg-[#a3a3a3]  text-black p-2">post</button>
            </form>
          </div>
          <div className=" flex flex-col gap-2 mt-3">
            {
              reviews?.map(i => {
                return (
                  <div className="rounded-md" key={i.id}>
                    {i.content}
                  </div>
                )
              })
            }
          </div>
        </div>


      </div>
    </div>
  );
}

