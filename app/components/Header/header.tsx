"use-client";

import Link from "next/link";
import LogoutButton from "../logout/logout";
import { Button } from "@/app/components/ui/button";

interface Props {
  username: string;
}

export const Navbar = ({ username }: Props) => {
  return (
    <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
      <div className="grid grid-cols-12 gap-3 px-5 ">
        <div className="logo col-span-1 flex items-center">
          <p className="font-bold">ALPHA PM</p>
        </div>
        <div className="links col-span-7"></div>

        {username && (
          <div className="profile col-span-4 flex items-center gap-2 py-2 justify-end">
            <Link href="/project/create" className="">
              <Button variant="link">Create Project</Button>
            </Link>
            <LogoutButton>Logout</LogoutButton>
          </div>
        )}
      </div>
    </nav>
  );
};
