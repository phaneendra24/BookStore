import { api } from "~/utils/api";
import BooksCard from "./bookcard";

export default function Mainfeed() {
  return (
    <div className="mt-5 grid h-[80vh] w-full grid-cols-3 gap-5 overflow-scroll px-2 py-4">
      <BooksCard />
    </div>
  );
}
