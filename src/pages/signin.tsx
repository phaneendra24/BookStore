import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Signin() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/");
  }
  return (
    <div className="flex h-[60vh] w-full flex-col items-center justify-center">
      <span>Login to proceed</span>
      <span className="cursor-pointer underline" onClick={() => void signIn()}>
        sigin
      </span>
    </div>
  );
}
