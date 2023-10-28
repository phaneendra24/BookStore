import { api } from "~/utils/api";

export function booklikestatus(querystring: string) {
  const { data, refetch } = api.update.userLikedstatus.useQuery(
    {
      id: querystring,
    },
    {
      enabled: !!querystring,
      refetchOnWindowFocus: false,
    }
  );

  return { likestatus: data, refetch };
}

export default function Eachbookdata(slug: string) {
  const { data, isLoading } = api.books.getEachBookData.useQuery(
    slug as string,
    { enabled: !!slug, refetchOnWindowFocus: false }
  );

  return { data, isLoading };
}

export function Getsellerdata(slug: string) {
  // query for getting sellerdata
  const { data } = api.books.sellerdata.useQuery(
    {
      id: slug as string,
    },
    { enabled: !!slug, refetchOnWindowFocus: false }
  );

  return { sellerdata: data };
}
