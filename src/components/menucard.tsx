import { signOut } from "next-auth/react";
import type { Dispatch, SetStateAction } from "react";
import Profilecard from "./profileLogoutcard/profilecard";

interface IMyProps {
  menustatus: boolean;
  setmenustatus: Dispatch<SetStateAction<boolean>>;
}
export default function MenuCard({ setmenustatus, menustatus }: IMyProps) {
  return (
    <>
      {menustatus ? (
        <div className="fixed left-0 z-20 flex h-full w-full justify-between bg-[#00] ">
          <div
            className="z-30
            flex h-full w-full flex-col bg-[#0f0f0f] py-1 hover:p-2  sm:w-3/12 sm:px-2"
          >
            <h1>BookStore</h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6 cursor-pointer"
              onClick={() => setmenustatus(false)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>

            <div>
              <Profilecard />
            </div>
            <div
              className="mx-10 mb-10 cursor-pointer rounded-sm border-y-[0.5px]   py-1 text-center text-xl font-semibold"
              onClick={() => void signOut()}
            >
              Logout
            </div>
          </div>
          <div
            className="h-full grow"
            onClick={() => {
              setmenustatus(false);
            }}
          ></div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
