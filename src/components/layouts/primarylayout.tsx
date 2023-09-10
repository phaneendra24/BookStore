import Navbar from "./Navbar";
import Sidebar from "./sidebar";
import MenuCard from "../menucard";
import { useState } from "react";
import Footer from "./Footer";

export default function PrimaryLayout({ children }: { children: JSX.Element }) {
  const [menustatus, setmenustatus] = useState(false);

  return (
    <div className="relative flex h-full min-h-screen w-full  justify-center bg-black  text-white">
      <MenuCard menustatus={menustatus} setmenustatus={setmenustatus} />

      <div className={`h-full w-full ${menustatus ? "opacity-40" : ""}`}>
        <Navbar menustatus={menustatus} setmenustatus={setmenustatus} />
        <div className="flex h-full" onClick={() => setmenustatus(false)}>
          <Sidebar />
          <div className=" mr-2 mt-24 w-full overflow-hidden sm:ml-20 sm:mr-5">
            {children}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
