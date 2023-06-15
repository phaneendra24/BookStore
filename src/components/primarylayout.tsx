import Navbar from "./Navbar";
import Sidebar from "./sidebar";

export default function PrimaryLayout({ children }: { children: JSX.Element }) {
  return (
    <div className="h-screen w-full bg-[#252525] px-5">
      <Navbar />
      {/* <Sidebar /> */}
      {children}

      <div>hai there</div>
    </div>
  );
}
