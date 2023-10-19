/* eslint-disable  @typescript-eslint/no-non-null-assertion */
import { Session } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useState } from "react";
type popcardprops = {
  data: Session | null;
  setpopup: Dispatch<SetStateAction<boolean>>;
};

const Popupcard = ({ data, setpopup }: popcardprops) => {
  return (
    <div className="fixed inset-0 flex h-full w-full justify-end bg-black backdrop-brightness-75 transition-all   sm:bg-transparent   md:pr-20">
      <div
        onClick={() => {
          setpopup(false);
        }}
        className="h-full w-full"
      ></div>
      <button
        className="absolute mt-3 w-full rounded-xl bg-white text-center text-black sm:invisible sm:w-fit"
        onClick={() => setpopup(false)}
      >
        close
      </button>
      <div
        className="z-100 absolute top-14 flex  h-full w-full flex-col gap-10 rounded-sm border-[2px] border-[#353535] bg-black p-2 px-10 sm:mt-4 sm:h-fit sm:w-fit  sm:px-3 "
        onClick={() => {
          console.log("true");

          setpopup(true);
        }}
      >
        <div className="flex w-full gap-10 text-xs">
          <Image
            src={data?.user.image ?? ""}
            alt="err loading"
            width={30}
            height={30}
            className="rounded-full"
          />
          <div>
            <h1>{data?.user.name}</h1>
            <h1>{data?.user.email}</h1>
          </div>
        </div>
        <button
          className="flex items-center  text-center"
          onClick={() => void signOut()}
        >
          <Image
            src="/signout.svg"
            alt="err"
            width={20}
            height={20}
            className="mr-12"
          />
          <span className="">Signout</span>
        </button>
      </div>
    </div>
  );
};

export default function Profileicon() {
  const { data } = useSession();
  const [isopen, setisopen] = useState(false);
  return (
    <>
      <div className="h-fit w-fit cursor-pointer">
        {data ? (
          <Image
            src={data?.user.image ?? ""}
            alt="err loading"
            width={30}
            height={30}
            className="h-10 w-10 rounded-full"
            onClick={() => setisopen(!isopen)}
          />
        ) : (
          <div
            className="rounded-full border-[1px] border-slate-600 p-2 text-blue-500"
            onClick={() => {
              void signIn("google");
            }}
          >
            Signin
          </div>
        )}
      </div>
      {isopen && <Popupcard data={data} setpopup={setisopen} />}
    </>
  );
}
