import Navbar from "./Navbar";
import Sidebar from "./sidebar";

export default function PrimaryLayout({ children }: { children: JSX.Element }) {
  return (
    <div className="flex h-full min-h-[100vh] w-full justify-center  bg-black">
      <div className="fixed  h-fit w-[90%] sm:w-[95%]">
        <Navbar />
      </div>
      <div className="relative top-20 h-full w-[90%] sm:w-[95%] ">
        <div className="fixed w-0 sm:w-fit">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
