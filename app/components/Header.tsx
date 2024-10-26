import Link from "next/link";
import Search from "./Search";

export default function Header() {
    return (
      <header className="bg-gray-800 text-white shadow-lg border-b sticky top-0 z-50">
        <div className="px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="text-2xl font-bold">
            <Link href="/">Tecgen</Link>
          </div>
          <Search/>
          <Link href="/wishlist" className=" text-gray-400 hover:text-gray-300 focus:outline-none">
            Wishlist
          </Link>
        </div>
      </header>
    );
  }