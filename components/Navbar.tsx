import Image from "next/image";
import { Button } from "@/components/ui";
import Link from "next/link";
const Navbar = () => {
  return (
    <div className="border-b-2 w-full px-5 py-6 flex justify-between flex-row">
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

      <div className="flex">
        <Link href="/">
          <Button variant="link">Summarizer</Button>
        </Link>
        <Button variant="link">Thumbnail Generator</Button>
      </div>

      <div className="flex flex-row items-center">
        <Link href="/login">
          <Button variant="ghost" className="mr-3">
            Login
          </Button>
        </Link>
        <Link href="/signup">
          <Button>Sign Up</Button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
