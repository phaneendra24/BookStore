export default function Genresuggs() {
  const genres = [
    "Fantasy",
    "Comedy",
    "Horror",
    "Mythology",
    "Romance",
    "Romance",
    "Romance",
    "Adventure",
  ];

  return (
    <div className=" fixed flex w-[40vh] gap-5 overflow-scroll bg-slate-700">
      {genres.map((i) => {
        return (
          <button
            key={i}
            className="rounded-lg border-[1px] border-gray-300 px-4  "
          >
            {i}
          </button>
        );
      })}
    </div>
  );
}
