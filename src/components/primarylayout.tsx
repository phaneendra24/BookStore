import Navbar from "./Navbar";
import Sidebar from "./sidebar";

export default function PrimaryLayout({ children }: { children: JSX.Element }) {
  return (
    <div className="h-screen w-full overflow-hidden bg-black px-10">
      <div className=" h-fit w-full">
        <Navbar />
      </div>
      <div className=" flex">
        <div className="w-0 sm:w-fit">
          <Sidebar />
        </div>
        <div className="w-full bg-black">{children}</div>
      </div>
    </div>
  );
}
