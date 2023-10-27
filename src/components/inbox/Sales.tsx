import { api } from "~/utils/api";
import Filetercomponent from "./filtermenu";
import { Dispatch, SetStateAction, useState } from "react";
import Backdrop from "./backdrop";

const Content = ({
  setopen,
}: {
  setopen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { data } = api.books.getuserbooks.useQuery();

  return (
    <div className="flex w-full flex-col gap-5">
      {data?.map((i) => (
        <div key={i.id} className=" ">
          {i.bookName}
          <div className="flex justify-around text-black  ">
            <button
              className="flex items-center justify-center rounded-lg bg-white p-1"
              onClick={() => setopen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
                />
              </svg>
              Edit
            </button>
            <button className="rounded-lg bg-white p-1 ">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

const Sales = () => {
  const [open, setopen] = useState(false);

  return (
    <div className="w-full border-[#353535] py-2  sm:min-h-[80vh] sm:w-2/3  sm:border-l-[1px] sm:px-2">
      {open && <Backdrop setopen={setopen} />}
      <header className="flex gap-5  text-xl ">
        Sales
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
            d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
      </header>
      <p className="text-xs text-gray-600">
        (You can manage book you sold here)
      </p>
      {/* content */}
      <div className="mt-2 w-full">
        <Filetercomponent />
        <Content setopen={setopen} />
      </div>
    </div>
  );
};

export default Sales;
