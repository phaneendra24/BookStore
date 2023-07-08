/* eslint-disable  @typescript-eslint/no-non-null-assertion */

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export default function Profileicon() {
  const { data } = useSession();
  const [authcard, setauthcard] = useState(false);
  return (
    <div className="w-fit">
      <div
        className="h-fit w-fit cursor-pointer"
        onClick={() => setauthcard(!authcard)}
      >
        {data ? (
          <Image
            src={data?.user.image ?? ""}
            alt="err loading"
            width={30}
            height={30}
            className="h-10 w-10 rounded-full"
          />
        ) : (
          <div
            className="rounded-lg border-[2px] border-slate-600 p-2"
            onClick={() => {
              setauthcard(false);
              void signIn();
            }}
          >
            Signin
          </div>
        )}
      </div>
      {authcard ? (
        <div className="fixed right-10 flex h-40 w-1/6  translate-y-5 flex-col items-center justify-around rounded-lg border-[0.2px] bg-[#252525] shadow-2xl transition-all">
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
      ) : (
        <></>
      )}
    </div>
  );
}
