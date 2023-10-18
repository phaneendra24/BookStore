import { signIn } from "next-auth/react";

export default function Signin() {
  return (
    <div className="flex min-h-[80vh] w-full flex-col items-center justify-center ">
      <div className="flex h-fit w-[90%] flex-col items-center justify-center gap-5 rounded-md border-[0.1px] p-10 sm:w-[40%]">
        <span>Login to proceed</span>
        <span
          className="cursor-pointer rounded-md bg-white px-2 py-1 text-black underline"
          onClick={() => void signIn("google")}
        >
          sigin
        </span>
      </div>
    </div>
  );
}
