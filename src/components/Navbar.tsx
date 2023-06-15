import Image from "next/image";
import Profilecard from "./profilecard";

function Navbar() {
  return (
    <nav className="absolute h-full w-60  bg-stone-500 px-2">
      <div className="mb-10">
        <Profilecard />
      </div>
      <ul>
        <div className="mb-5 flex items-center justify-between rounded-md bg-stone-600 p-1 px-3">
          <span>
            <Image src="/home.svg" width={30} height={30} alt="error loading" />
          </span>
          <li>Home</li>
        </div>
        <div className="mb-5  flex items-center justify-between bg-stone-600 p-1 px-3">
          <span>
            <Image
              src="/inbox.svg"
              width={30}
              height={30}
              alt="error loading"
            />
          </span>
          <li>Inbox</li>
        </div>
        <div className="mb-5  flex items-center justify-between bg-stone-600 p-1 px-3">
          <span>
            <Image
              src="/messages.svg"
              width={30}
              height={30}
              alt="error loading"
            />
          </span>
          <li>Messages</li>
        </div>
        <div className="flex  items-center justify-between bg-stone-600 p-1 px-3">
          <span>
            <Image
              src="/wishlist.svg"
              width={30}
              height={30}
              alt="error loading"
            />
          </span>
          <li>Wish List</li>
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
