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
    <div
      onClick={() => {
        setpopup(false);
      }}
      className="fixed inset-0 flex justify-end  backdrop-brightness-75   transition-all"
    >
      <div className="mr-10 mt-20 h-32 rounded-sm bg-[#252525] p-2">
        <div className="flex flex-col text-xs">
          <span>
            <Image
              src={data?.user.image ?? ""}
              alt="err loading"
              width={30}
              height={30}
              className="rounded-full"
            />
            {data?.user.name}
          </span>
          <span>{data?.user.email}</span>
        </div>
        <button
          onClick={() => void signOut()}
          className="w-full py-2 hover:bg-[#504d4d]"
        >
          Signout
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
            className="rounded-full text-blue-500 border-[1px] border-slate-600 p-2"
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
