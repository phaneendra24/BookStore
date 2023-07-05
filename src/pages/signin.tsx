import { type GetSessionParams, getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function Signin() {
  return (
    <div className="flex h-[60vh] w-full flex-col items-center justify-center">
      <span>Login to proceed</span>
      <span
        className="cursor-pointer underline"
        onClick={() => void signIn("google")}
      >
        sigin
      </span>
    </div>
  );
}
