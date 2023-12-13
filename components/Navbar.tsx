"use client";
import Image from "next/image";
import { Button } from "@/components/ui";
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
const Navbar = () => {
  const { data: session, status } = useSession();
  console.log("Session: ", session);
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
        {status === "unauthenticated" ? (
          <>
            <Link href="/login">
              <Button variant="ghost" className="mr-3">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={() => signOut()}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default Navbar;
