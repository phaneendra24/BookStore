import { type NextPage } from "next";
import Head from "next/head";
import Mainfeed from "~/components/mainfeed/Mainfeed";
import Genresuggs from "~/components/mainfeed/genresuggestions";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Online Bookstore</title>
        <meta
          name="description"
          content="An example bookstore app built with t3stack"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-col justify-center">
        <div className="w-full ">{/* <Genresuggs /> */}</div>
        <div className="w-full ">
          <Mainfeed />
        </div>
      </main>
    </>
  );
};

export default Home;
