import { wishlist } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";

type pageprops = {
  likestatus: wishlist | null | undefined;
};

export default function Wishlist({ likestatus }: pageprops) {
  const router = useRouter();
  const [like, setlike] = useState(Boolean);

  const { mutate, data } = api.update.updatinglike.useMutation();
  const addTowishlist = () => {
    if (like) {
      setlike(false);
    } else {
      setlike(true);
    }
    mutate({ id: router.query.slug as string });
  };

  useEffect(() => {
    if (likestatus) {
      setlike(true);
    } else {
      setlike(false);
    }
  }, [likestatus, mutate]);

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
            fill={`${like ? "#ff1d8e" : ""}`}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
      </button>
    </div>
  );
}
