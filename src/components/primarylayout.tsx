import Navbar from "./Navbar";
import Sidebar from "./sidebar";

export default function PrimaryLayout({ children }: { children: JSX.Element }) {
  return (
    <div className="flex h-full min-h-screen w-full  justify-center bg-black  text-white">
      <div className="h-full w-full">
        <Navbar />
        <div className="flex h-full  bg-black ">
          <Sidebar />
          <div className=" ml-20 mr-10 mt-32 w-10/12 overflow-hidden sm:ml-32">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
