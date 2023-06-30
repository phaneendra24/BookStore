import { GetSessionParams, getSession } from "next-auth/react";
import React, { useState } from "react";
import { api } from "~/utils/api";

export default function Trade() {
  const [bookname, setbookname] = useState("");
  const [authorname, setauthorname] = useState("");
  const [price, setprice] = useState(0);
  const [synopsis, setSynopsis] = useState("");
  const [Genre, setGenre] = useState("");
  const { mutate } = api.books.postbook.useMutation();

  const postBook = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({
      bookname: bookname,
      synopsis: synopsis,
      genre: Genre,
      pages: 100,
      authorname: authorname,
      price: price,
    });
  };

  return (
    <div className="relative">
      <div className="bg-gren-400 flex h-full flex-col gap-3">
        <header className="text-2xl">Sell Your Books Online</header>
        <form
          onSubmit={(e) => postBook(e)}
          className="flex flex-col items-start gap-4"
        >
          <div className="flex  w-full flex-col items-start gap-2">
            <span className="w-1/4">BookName</span>
            <input
              type="text"
              required
              onChange={(e) => setbookname(e.target.value)}
              className="w-[90%] border-[1px] border-slate-300 bg-transparent p-2 outline-none focus:border-yellow-400 lg:w-[50%]"
              placeholder="name of the book"
            />
          </div>
          <div className="flex  w-full gap-5">
            <div>
              <span className="w-1/4">Genre</span>
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

            <span>
              <h1>price :</h1>
              <input
                type="number"
                placeholder="enter price"
                className=" border-[1px] border-slate-400 bg-transparent p-2 outline-none"
                onChange={(e) => setprice(parseInt(e.target.value))}
              />
            </span>
          </div>
          <div className="flex  w-full flex-col items-start">
            <span className="w-1/4">Synopsis </span>
            <textarea
              onChange={(e) => setSynopsis(e.target.value)}
              placeholder="Describe your books in few words"
              required
              className=" h-28 w-[90%] resize-none border-[1px] border-slate-300 bg-transparent p-2 outline-none focus:border-yellow-400 lg:w-[50%]"
            ></textarea>
          </div>

          <div className="flex  w-full flex-col items-start">
            <span className="">Author Name</span>
            <input
              onChange={(e) => setauthorname(e.target.value)}
              type="text"
              className="w-[90%] border-[1px] border-slate-300 bg-transparent p-2 outline-none focus:border-yellow-400 lg:w-2/4"
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

export async function getServerSideProps(
  context: GetSessionParams | undefined
) {
  const session = await getSession(context);
  console.log(session);

  if (session === null) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}
