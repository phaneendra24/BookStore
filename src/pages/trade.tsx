"use client";

import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { api } from "~/utils/api";

export default function Trade() {
  const [bookname, setbookname] = useState("");
  const [sellername, setsellername] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [Genre, setGenre] = useState("");
  const { mutate, error } = api.books.postbook.useMutation();
  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  const postBook = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({
      bookname: bookname,
      synopsis: synopsis,
      genre: Genre,
      pages: 100,
      sellername: sellername,
    });
  };

  return (
    <div className="relative">
      <div className="bg-gren-400 flex h-full flex-col gap-5">
        <header className="text-3xl">Sell Your Books Online</header>
        <form onSubmit={(e) => postBook(e)} className="flex flex-col gap-10">
          <div className="flex items-center">
            <span className="w-1/4">BookName</span>
            <input
              type="text"
              required
              onChange={(e) => setbookname(e.target.value)}
              className="min-w-[40%] border-[1px] border-slate-300 bg-transparent p-2 outline-none focus:border-yellow-400"
              placeholder="name of the book"
            />
            <select
              onChange={(e) => {
                setGenre(e.target.value);
              }}
              className="block w-fit rounded-lg border-2 border-[#f7e400]
                bg-black p-2.5 text-sm text-gray-900  outline-none focus:ring-yellow-500 dark:bg-black dark:text-white dark:placeholder-black dark:focus:border-yellow-500
              "
              defaultValue="default"
            >
              <option value="default">Choose genre</option>
              <option value="fantasy" className="mt-2 p-2">
                fantasy
              </option>
              <option value="Romance" className="mt-2 py-5">
                Romance
              </option>
            </select>
          </div>
          <div className="flex items-center ">
            <span className="w-1/4">Synopsis </span>
            <textarea
              onChange={(e) => setSynopsis(e.target.value)}
              placeholder="Describe your books in few words"
              className="synopsis h-28 w-3/4  resize-none border-[1px] border-slate-300 bg-transparent p-2 outline-none focus:border-yellow-400 sm:w-2/4"
            ></textarea>
          </div>

          <div className="flex">
            <span className="w-1/4">Author Name</span>
            <input
              onChange={(e) => setsellername(e.target.value)}
              type="text"
              className="min-w-[40%] border-[1px] border-slate-300 bg-transparent p-2 outline-none focus:border-yellow-400"
            />
          </div>
          <button
            type="submit"
            onClick={() => postBook}
            className="w-fit rounded-sm bg-[#f7e400] p-2 px-2 font-semibold text-black"
          >
            Open to sell
          </button>
        </form>
      </div>
      <div className="absolute top-20 z-[-1]  h-40 w-40 bg-yellow-400"></div>
    </div>
  );
}
