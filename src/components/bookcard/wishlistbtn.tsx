import { useRouter } from "next/router";
import { api } from "~/utils/api";

export default function Wishlist() {
  const router = useRouter();
  const { mutate, data } = api.update.updatedlike.useMutation();
  const addTowishlist = () => {
    mutate({ id: router.query.slug as string });
  };

  return (
    <div className="flex items-center justify-center">
      Add :
      <button onClick={() => addTowishlist()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={0.2}
          stroke="currentColor"
          className="h-10 w-10"
        >
          <path
            fill={`${data ? "pink" : ""}`}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
      </button>
    </div>
  );
}
