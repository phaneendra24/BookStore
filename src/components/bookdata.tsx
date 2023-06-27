import { useEffect } from "react";
import { api } from "~/utils/api";

type pageprops = {
  id: string | string[] | undefined;
};

export default function Bookdata({ id }: pageprops) {
  //   const { mutate, data } = api.books.getDetailsofBook.useMutation();

  //   useEffect(() => {
  //     if (typeof id === "string") {
  //       mutate({
  //         id: id,
  //       });
  //     }
  //   }, [id]);

  return <div></div>;
}
