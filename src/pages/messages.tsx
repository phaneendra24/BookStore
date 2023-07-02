import { GetSessionParams, getSession } from "next-auth/react";
import { useEffect } from "react";

export default function Messages() {
  useEffect(() => {
    const call = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
      const data = await res.json();
      console.log(data);
    };
    call();
  }, []);
  return <>Messages</>;
}
