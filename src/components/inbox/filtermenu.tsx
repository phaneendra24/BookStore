import { Dispatch, SetStateAction, useState } from "react";

import { motion } from "framer-motion";

const Popup = ({
  arr,
  setfilter,
  setopen,
}: {
  arr: string[];
  setfilter: Dispatch<SetStateAction<string>>;
  setopen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <ul className="absolute right-3  top-10 rounded-lg border-[1px] border-[#353535] p-3 px-3">
      <div className="text-[#b9b9b9]">Filter by:</div>
      {arr.map((i) => {
        return (
          <li
            key={i}
            className="cursor-pointer rounded-lg p-1 hover:bg-[#1c1c1c]"
            onClick={() => {
              setfilter(`${i}`);
              setopen(false);
            }}
          >
            {i}
          </li>
        );
      })}
    </ul>
  );
};

const Filetercomponent = () => {
  const filteroptions = ["sold", "unsold", "All"];
  const [open, setopen] = useState(false);
  const [filter, setfilter] = useState("All");

  return (
    <nav className="relative flex w-full justify-between">
      <input
        className="w-2/3 border-[1px] border-[#353535] bg-black p-1  focus:border-[#252525] "
        placeholder="search..."
      />
      <div className="flex items-center justify-center gap-2">
        <span>{filter}</span>
        <span
          className="cursor-pointer rounded-md bg-[#353535] p-1"
          onClick={() => setopen((prev) => !prev)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
            />
          </svg>
        </span>
      </div>

      {open ? (
        <Popup setopen={setopen} arr={filteroptions} setfilter={setfilter} />
      ) : (
        <></>
      )}
    </nav>
  );
};

export default Filetercomponent;
