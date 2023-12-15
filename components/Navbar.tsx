"use client";
import Image from "next/image";

import Link from "next/link";

const Navbar = () => {
  return (
    <div className="border-b-2 sticky top-0 bg-black w-full px-5 py-6 flex justify-between flex-row">
      <div>
        <Link href="/">
          <Image
            src="/logo.svg"
            className="dark:white"
            alt="logo"
            width={120}
            height={24}
            priority
          />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
