import Navbar from "./Navbar";
import MenuCard from "../menucard";
import { useState } from "react";
import Footer from "./Footer";

export default function PrimaryLayout({ children }: { children: JSX.Element }) {
  const [menustatus, setmenustatus] = useState(false);

  return (
    <div className="relative flex flex-col h-full min-h-screen w-[100wh]  justify-center bg-black  text-white">
      <Navbar menustatus={menustatus} setmenustatus={setmenustatus} />

      <div className={`pt-16 h-full w-full ${menustatus ? "opacity-40" : ""}`}>
            {children}
      </div>
      <Footer />
    </div>
  );
}
