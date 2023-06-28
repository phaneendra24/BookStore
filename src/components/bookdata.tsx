import { useRouter } from "next/router";

type pageprops = {
  id: string | string[] | undefined;
};

export default function Bookdata() {
  const router = useRouter();
  // const { data, isLoading } = api.books.getEachBookData.useQuery(
  //   {
  //     id: router.query.slug as string,
  //   },
  //   {
  //     enabled: !!router.query.slug,
  //   }
  // );

  return <div></div>;
}
