import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import LoadingUi from "~/components/loadingui";
import { api } from "~/utils/api";
import Signin from "../signin";
import { enqueueSnackbar } from "notistack";
import Image from "next/image";



export default function Trade() {
  const [open, setopen] = useState(false);
  const [bookname, setbookname] = useState("");

  const [authorname, setauthorname] = useState("");
  const [price, setprice] = useState(0);
  const [synopsis, setSynopsis] = useState("");
  const [Genre, setGenre] = useState("");
  const { mutate, status: poststatus } = api.books.postbook.useMutation();
  const { data: session, status } = useSession();

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

  useEffect(() => {
    if (poststatus == "success") {
      enqueueSnackbar("Your book is out for sale", { variant: "success" });
      setbookname("");
      setSynopsis("");
      setauthorname("");
      setGenre("");
      setprice(0);
    }
  }, [poststatus]);

  console.log(Genre);

  const selectoption = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setGenre(e.currentTarget.value);
    setopen(false);
  };

  const GenreFields = ["Fanstasy", "Horror", "Sci-Fi", "Mythology", "Romance"];
  return (
    <div className="relative min-h-[80vh]">
      {status == "loading" ? (
        <LoadingUi />
      ) : (
        <>
          {!session ? (
            <Signin />
          ) : (
            <div className="flex justify-center  items-center px-10 gap-3">
              <div className="w-1/3  hidden md:block">
                <Image src="shelves.svg" alt="failed to load" width={150} height={150} className="h-96 w-96 flex-shrink-0" />
              </div>

              <form className="flex h-full w-full md:w-1/2 flex-col gap-4">
                <div className="flex w-full gap-5 justify-between items-center ">
                  <span className="w-32">Bookname</span>
                  <input
                    required
                    className="rounded-md border-[1px] border-[#343434] bg-black p-2 outline-none   focus:border-white w-full "
                    placeholder="bookname...."
                    onChange={(e) => setbookname(e.currentTarget.value)}
                  />
                </div>
                {/* each input divs */}
                <div className="flex w-full gap-5 justify-between">
                  <span className="w-32">AuthorName</span>
                  <input
                    required
                    className="rounded-md border-[1px] border-[#343434] bg-black p-2 outline-none   focus:border-white w-full "
                    placeholder="bookname...."
                    onChange={(e) => setauthorname(e.currentTarget.value)}
                  />
                </div>

                {/* next */}

                <div className="flex w-full gap-6 justify-between ">
                  <span className="w-32">Price</span>
                  <input
                    required
                    value={price}
                    type="number"
                    className="rounded-md border-[1px] border-[#343434] bg-black p-2 outline-none   focus:border-white w-full"
                    placeholder="bookname...."
                    onChange={(e) =>
                      setprice(parseInt(e.currentTarget.value))
                    }
                  />
                </div>
                {/* each input divs */}
                <div className="relative flex w-full gap-5 justify-between">
                  {open ? (
                    <div className="absolute right-5 scrollbar-hide gap-4 top-10 flex h-32 w-[9.8rem] flex-col overflow-scroll  bg-black ">
                      {GenreFields.map((i) => {
                        return (
                          <button
                            value={i}
                            key={i}
                            onClick={(e) => selectoption(e)}
                            className="border-[1px] p-2 border-[#323232]"
                          >
                            {i}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    ""
                  )}
                  <span>Genre</span>
                  <button
                    type="button"
                    className="flex p-2 rounded-md w-fit min-w-[10vh] cursor-pointer border-[1px] border-[#343434] bg-black px-2"
                    onClick={() => {
                      setopen((prev) => !prev);
                    }}
                  >
                    {Genre === "" ? "Select Genre" : Genre}
                    {!open ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 15.75l7.5-7.5 7.5 7.5"
                        />
                      </svg>
                    )}
                  </button>
                </div>

                {/* next */}

                <div className="flex gap-5 w-full ">
                  <span className="w-32">Synopsis</span>

                  <textarea
                    className="min-h-[20vh] rounded-md  w-full border-[1px] border-[#343434] bg-black p-2 outline-none"
                    onChange={(e) => setSynopsis(e.currentTarget.value)}
                  />
                </div>
                {/* each input divs */}
                <button
                  type="submit"
                  className="rounded-md bg-[#6c63ff] text-white p-2 px-10 "
                  onClick={(e) => postBook(e)}
                >
                  POST
                </button>
              </form>
            </div>

          )}
        </>
      )}
    </div>
  );
}
