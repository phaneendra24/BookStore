import { GetSessionParams, getSession, signIn } from "next-auth/react";

export default function Signin() {
  return (
    <div className="flex h-[60vh] w-full flex-col items-center justify-center">
      <span>Login to proceed</span>
      <span className="cursor-pointer underline" onClick={() => void signIn()}>
        sigin
      </span>
    </div>
  );
}

export async function getServerSideProps(
  context: GetSessionParams | undefined
) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}
