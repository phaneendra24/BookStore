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
    <div className="no-scrollbar flex w-full gap-5 overflow-scroll">
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
