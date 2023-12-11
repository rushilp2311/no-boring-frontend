"use client";
import Navbar from "@/components/Navbar";
import { Button, H1, H2 } from "@/components/ui";
import Image from "next/image";
export default function Home() {
  return (
    <>
      <Navbar />
      <div className="p-10 w-full h-full">
        <H2>Choose from below</H2>
      </div>
    </>
  );
}
