"use client";

import { signOut } from "next-auth/react";
import type { Dispatch, SetStateAction } from "react";
import Profilecard from "./profilecard";

interface IMyProps {
  menustatus: boolean;
  setmenustatus: Dispatch<SetStateAction<boolean>>;
}
export default function MenuCard({ setmenustatus, menustatus }: IMyProps) {
  return (
    <>
      {menustatus ? (
        <div className="fixed left-0 z-10 flex h-full w-1/5 flex-col justify-between bg-[#0f0f0f]">
          <div className="mt-10 flex h-10 w-full justify-end py-1  hover:p-2 sm:px-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6 cursor-pointer border-2 border-yellow-400 "
              onClick={() => setmenustatus(false)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          <div>
            <Profilecard />
          </div>
          <div
            className="mx-10 mb-10 cursor-pointer rounded-sm bg-[#f7e400] text-center text-2xl font-semibold text-black"
            onClick={() => void signOut()}
          >
            Logout
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
