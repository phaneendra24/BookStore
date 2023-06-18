import { api } from "~/utils/api";

export default function Trade() {
  const mutation = api.books.postbook.useMutation();

  const postBook = () => {
    const data = mutation.mutate();

    console.log(data);
  };

  return (
    <div className="mt-10  px-10 text-white">
      Trade will be displayed here --
      <form onSubmit={postBook}>
        <div>
          <span>BookName</span>
          <input
            type="text"
            required
            className="border-[0.5px] border-slate-300 bg-transparent outline-none"
          />
        </div>
        <div>
          <span>Synopsis</span>
          <input
            type="text"
            required
            className="border-[0.5px] border-slate-300 bg-transparent outline-none"
          />
        </div>
        <div>
          <span>Genre</span>
          <input
            type="text"
            required
            className="border-[0.5px] border-slate-300 bg-transparent outline-none"
          />
        </div>
        <div>
          <span>pages</span>
          <input
            type="text"
            required
            className="border-[0.5px] border-slate-300 bg-transparent outline-none"
          />
        </div>
        <div>
          <span>authorname</span>
          <input
            type="text"
            required
            className="border-[0.5px] border-slate-300 bg-transparent outline-none"
          />
        </div>

        <button
          type="submit"
          onClick={() => postBook}
          className="rounded-sm bg-slate-800 p-2 px-2"
        >
          send
        </button>
      </form>
    </div>
  );
}
