import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Profileicon() {
  const { data } = useSession();

  return (
    <div
      className="h-fit w-fit cursor-pointer rounded-full border-[2px] border-green-900"
      onClick={() => signIn()}
    >
      <Image
        src={data?.user.image ?? "/avatar.svg"}
        alt="err loading"
        width={30}
        height={30}
        className=" rounded-full"
      />
    </div>
  );
}
