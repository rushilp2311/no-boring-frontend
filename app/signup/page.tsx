"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import { UserAuthForm } from "@/components/user-auth-form";
import { useToast } from "@/components/ui/use-toast";

export default function SignUp() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onSubmit = (email: string, password: string) => {
    setIsLoading(true);
    fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(async (res) => {
      if (res.status === 200) {
        toast({
          title: "Account Created",
          description: "Redirecting to login...",
        });
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        console.log(res);
      }
      setIsLoading(false);
    });
  };

  return (
    <>
      <div className="container relative h-full flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/login"
          className={cn("absolute right-4 top-4 md:right-8 md:top-8")}
        >
          <Button variant="ghost">Login</Button>
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
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Use your email to sign up
              </p>
            </div>
            <UserAuthForm
              formType="Sign Up"
              onSubmit={onSubmit}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </>
  );
}
