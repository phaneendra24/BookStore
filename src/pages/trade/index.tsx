import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import LoadingUi from "~/components/loadingui";
import { api } from "~/utils/api";
import Signin from "../signin";
import { enqueueSnackbar } from "notistack";

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
            <div className="flex min-h-[80vh] w-full flex-col items-center px-5">
              <header className="text-2xl font-bold">
                Sell your books Online
              </header>
              <form className="flex h-full w-full flex-col gap-10">
                <div className="flex w-full  justify-center gap-5">
                  <div className="flex w-1/2 flex-col ">
                    <span>Bookname</span>
                    <input
                      required
                      className="rounded-md border-[1px] border-[#343434] bg-black px-2 py-1 outline-none   focus:border-white sm:w-[80%] "
                      placeholder="bookname...."
                      onChange={(e) => setbookname(e.currentTarget.value)}
                    />
                  </div>
                  {/* each input divs */}
                  <div className="flex w-1/2 flex-col">
                    <span>AuthorName</span>
                    <input
                      required
                      className="rounded-md border-[1px] border-[#343434] bg-black px-2 py-1 outline-none   focus:border-white sm:w-[80%] "
                      placeholder="bookname...."
                      onChange={(e) => setauthorname(e.currentTarget.value)}
                    />
                  </div>
                </div>

                {/* next */}

                <div className="flex w-full  justify-center gap-5">
                  <div className="flex w-1/2 flex-col ">
                    <span>Price</span>
                    <input
                      required
                      value={price}
                      type="number"
                      className="rounded-md border-[1px] border-[#343434] bg-black px-2 py-1 outline-none   focus:border-white sm:w-[80%] "
                      placeholder="bookname...."
                      onChange={(e) =>
                        setprice(parseInt(e.currentTarget.value))
                      }
                    />
                  </div>
                  {/* each input divs */}
                  <div className="relative flex w-1/2 flex-col">
                    {open ? (
                      <div className="absolute left-0 top-16 flex h-32 w-[9.8rem] flex-col overflow-scroll border-[1px] border-[#323232] bg-black ">
                        {GenreFields.map((i) => {
                          return (
                            <button
                              value={i}
                              key={i}
                              onClick={(e) => selectoption(e)}
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
                      className="flex w-fit min-w-[10vh] cursor-pointer border-[1px] border-[#343434] bg-black px-2"
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
                </div>

                {/* next */}

                <div className="flex w-full flex-col justify-center  gap-5 sm:flex-row">
                  <div className="flex flex-col sm:w-1/2 ">
                    <span>Synopsis</span>

                    <textarea
                      className="min-h-[20vh] w-full border-[1px] border-[#343434] bg-black p-2 outline-none"
                      onChange={(e) => setSynopsis(e.currentTarget.value)}
                    />
                  </div>
                  {/* each input divs */}
                  <div className="flex w-1/2 flex-col">
                    <span>upload</span>
                    <input
                      type="file"
                      required
                      className="w-fit rounded-md border-[1px] border-[#343434] bg-black px-2 py-1 outline-none   focus:border-white  "
                    />
                  </div>
                </div>

                <div className=" flex w-full justify-center">
                  <button
                    type="submit"
                    className="border-[2px] border-[#323232] bg-white p-2 px-10 text-black"
                    onClick={(e) => postBook(e)}
                  >
                    submit
                  </button>
                </div>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
}
