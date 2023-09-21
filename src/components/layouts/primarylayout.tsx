import Navbar from "./Navbar";
import Sidebar from "./sidebar";
import MenuCard from "../menucard";
import { useState } from "react";
import Footer from "./Footer";

export default function PrimaryLayout({ children }: { children: JSX.Element }) {
  const [menustatus, setmenustatus] = useState(false);

  return (
    <div className="relative flex h-full min-h-screen w-full  justify-center bg-black  text-white">
      <Navbar menustatus={menustatus} setmenustatus={setmenustatus} />
      <Sidebar />

      <div className={`mx-4 h-full w-full  ${menustatus ? "opacity-40" : ""}`}>
        <div className="flex h-full pb-16" onClick={() => setmenustatus(false)}>
          <div className="mt-24 w-full overflow-hidden sm:ml-20">
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
