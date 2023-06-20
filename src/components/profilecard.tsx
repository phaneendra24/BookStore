import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

// import { getServerAuthSession } from "../server/auth";
// import { type GetServerSideProps } from "next";

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const session = await getServerAuthSession(ctx);
//   return {
//     props: { session },
//   };
// };

export default function Profilecard() {
  const { data: session } = useSession();
  const [toogleon, setToggleon] = useState(false);

  if (!session) {
    return (
      <div className="flex h-52 w-52 animate-pulse flex-col items-center justify-center">
        <div className="h-24 w-[50%] animate-pulse rounded-2xl"></div>
        <div className="mt-5 h-5 w-[80%] animate-pulse "></div>
      </div>
    );
  }

  return (
    <>
      <div
        className="mt-5 flex w-52 flex-col justify-start rounded-lg px-10 py-5"
        onClick={() => setToggleon(true)}
      >
        <Image
          src={session.user.image ?? "/home.png"}
          alt="profile photo"
          width={50}
          height={50}
          className="w-28 rounded-full"
        />
        {session.user.name ?? <>phaneendra</>}
      </div>
      {toogleon ? <div>show</div> : <></>}
    </>
  );
}
