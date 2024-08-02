"use client";
import { signOut } from "next-auth/react";
import { Button } from "@/app/components/ui/button";

type ButtonProps = {
  children: React.ReactNode;
};

const LogoutButton = ({ children }: ButtonProps) => {
  return <Button onClick={() => signOut()}>{children}</Button>;
};

export default LogoutButton;
