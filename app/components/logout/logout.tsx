"use client";
import { signOut } from "next-auth/react";
import { Button } from "@/app/components/ui/button";
import { LogOut } from "lucide-react";

type ButtonProps = {
  children: React.ReactNode;
};

const LogoutButton = ({ children }: ButtonProps) => {
  return (
    <Button onClick={() => signOut()}>
      <LogOut className="mr-2 h-4 w-4" /> {children}
    </Button>
  );
};

export default LogoutButton;
