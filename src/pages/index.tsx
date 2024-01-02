import { type NextPage } from "next";
import Head from "next/head";
import Mainfeed from "~/components/mainfeed/Mainfeed";

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
      <main className="flex flex-col justify-normal min-h-[100vh]">
          <Mainfeed />
          <div className="text-[#a3a3a3] px-10 py-5  text-center border-t-[0.1px] border-[#a3a3a3]">
            Developed by @phaneendra
          </div>
      </main>
    </>
  );
};

export default Home;
