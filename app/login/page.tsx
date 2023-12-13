"use client";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import { UserAuthForm } from "@/components/user-auth-form";
import { signIn } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function Login() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onSubmit = async (email: string, password: string) => {
    setIsLoading(true);
    // @ts-ignore
    const { error } = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Incorrect Credentials",
        description: error,
      });
    } else {
      router.push("/");
    }

    setIsLoading(false);
  };

  return (
    <>
      <div className="container relative h-full flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/signup"
          className={cn("absolute right-4 top-4 md:right-8 md:top-8")}
        >
          <Button variant="ghost">Sign Up</Button>
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
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
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Login to your account
              </h1>
              <p className="text-sm text-muted-foreground">
                Use your email to login
              </p>
            </div>
            <UserAuthForm
              formType="LogIn"
              onSubmit={onSubmit}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </>
  );
}
