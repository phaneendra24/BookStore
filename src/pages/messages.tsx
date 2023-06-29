import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Messages() {
  const { data: session } = useSession();

  const router = useRouter();

  if (!session) {
    router.push("/signin");
  }

  return <></>;
}
