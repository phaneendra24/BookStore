import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import LoadingUi from "~/components/loadingui";
import { api } from "~/utils/api";
import Signin from "./signin";
import { enqueueSnackbar } from "notistack";

export default function Trade() {
  const [bookname, setbookname] = useState("");
  const [authorname, setauthorname] = useState("");
  const [price, setprice] = useState(0);
  const [synopsis, setSynopsis] = useState("");
  const [Genre, setGenre] = useState("");
  const { mutate, status: poststatus } = api.books.postbook.useMutation();
  const { data: session, status } = useSession();

  const postBook = async (e: React.FormEvent) => {
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

  return (
    <div className="relative ">
      {status == "loading" ? (
        <LoadingUi />
      ) : (
        <>
          {!session ? (
            <Signin />
          ) : (
            <>
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
                      value={bookname}
                      onChange={(e) => setbookname(e.target.value)}
                      className="w-[90%] border-[1px] border-gray-700 bg-transparent p-2 outline-none focus:border-gray-50 lg:w-[50%]"
                      placeholder="name of the book"
                    />
                  </div>
                  <div className="item flex w-full flex-col gap-5 sm:flex-row">
                    <div>
                      <span className="w-1/4">Genre</span>
                      <select
                        onChange={(e) => {
                          setGenre(e.target.value);
                        }}
                        className="block w-fit rounded-lg border-2 border-gray-700
                bg-black p-2.5 text-sm text-gray-900  outline-none focus:ring-gray-50 dark:bg-black dark:text-white dark:placeholder-black dark:focus:border-gray-500
              "
                        defaultValue="default"
                      >
                        <option value="default">Choose genre</option>
                        <option value="fantasy" className="mt-2 p-2">
                          fantasy
                        </option>
                        <option value="comedy" className="mt-2 py-5">
                          comedy
                        </option>
                        <option value="Horror" className="mt-2 py-5">
                          Horror
                        </option>
                        <option value="Mythology" className="mt-2 py-5">
                          Mythology
                        </option>
                        <option value="Romance" className="mt-2 py-5">
                          Romance
                        </option>
                        <option value="Adventure" className="mt-2 py-5">
                          Adventure
                        </option>
                      </select>
                    </div>

                    <span>
                      <h1>price :</h1>
                      <input
                        type="number"
                        placeholder="enter price"
                        value={price}
                        className=" border-[1px] border-gray-700 bg-transparent p-2 outline-none focus:border-gray-50"
                        onChange={(e) => setprice(parseInt(e.target.value))}
                      />
                    </span>
                  </div>
                  <div className="flex  w-full flex-col items-start">
                    <span className="w-1/4">Synopsis </span>
                    <textarea
                      value={synopsis}
                      onChange={(e) => setSynopsis(e.target.value)}
                      placeholder="Describe your books in few words"
                      required
                      className=" h-28 w-[90%] resize-none border-[1px] border-gray-700 bg-transparent p-2 outline-none focus:border-gray-50 lg:w-[50%]"
                    ></textarea>
                  </div>

                  <div className="flex  w-full flex-col items-start">
                    <span className="">Author Name</span>
                    <input
                      value={authorname}
                      onChange={(e) => setauthorname(e.target.value)}
                      type="text"
                      className="w-[90%] border-[1px] border-gray-700 bg-transparent p-2 outline-none focus:border-gray-50 lg:w-2/4"
                    />
                  </div>
                  <div className="flex w-[90%] lg:w-[50%]">
                    <button
                      type="submit"
                      onClick={() => postBook}
                      className=" w-full rounded-sm bg-gray-500 p-2  px-2 font-semibold  "
                    >
                      {poststatus == "loading" ? (
                        <div className="cursor-not-allowed opacity-50">
                          processing
                        </div>
                      ) : (
                        <>Open to sell</>
                      )}
                    </button>
                  </div>
                </form>
              </div>
              <div className="bg-gray-700-400 absolute top-20  z-[-1] h-40 w-40"></div>
            </>
          )}
        </>
      )}
    </div>
  );
}
