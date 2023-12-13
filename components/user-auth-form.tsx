"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, Input, Label } from "./ui";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  formType?: "Sign Up" | "LogIn";
  onSubmit?: any;
  isLoading?: boolean;
}

export function UserAuthForm({
  className,
  formType,
  onSubmit,
  isLoading,
  ...props
}: UserAuthFormProps) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <div className={cn("grid gap-4", className)} {...props}>
      <Label>Email</Label>
      <Input
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Label>Password</Label>
      <Input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={() => onSubmit(email, password)}>
        {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : formType}
      </Button>
    </div>
  );
}
