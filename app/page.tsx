"use client";
import Navbar from "@/components/Navbar";
import { H2 } from "@/components/ui";

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
