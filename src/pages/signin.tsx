import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Signin() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session]);

  return (
    <div className="flex h-[60vh] w-full flex-col items-center justify-center">
      <span>Login to proceed</span>
      <span className="cursor-pointer underline" onClick={() => void signIn()}>
        sigin
      </span>
    </div>
  );
}
