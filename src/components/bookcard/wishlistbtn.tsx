import type { wishlist } from "@prisma/client";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

type pageprops = {
  likestatus: wishlist | null | undefined;
};

export default function Wishlist({ likestatus }: pageprops) {
  const router = useRouter();
  const { data, refetch } = api.update.userLikedstatus.useQuery(
    router.query.slug as string
  );
  const { mutate, isSuccess } = api.update.updatinglike.useMutation();
  const addTowishlist = () => {
    mutate({ id: router.query.slug as string });
  };
  if (isSuccess) {
    const goandrefetch = async () => {
      await refetch();
    };
    void goandrefetch();
  }

  return (
    <div className="flex items-center justify-center">
      Add to Wishlist :
      <motion.button
        whileTap={{
          scale: 1.2,
        }}
        onClick={() => addTowishlist()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={0.2}
          stroke="currentColor"
          className="h-10 w-10"
        >
          <path
            fill={`${data ? "#ff1d8e" : ""}`}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
      </motion.button>
    </div>
  );
}
