import { Navbar } from "@/app/components/Header/header";
import LogoutButton from "@/app/components/logout/logout";
import ProjectList from "@/app/components/project-list/project-list";
import { auth } from "@/lib/auth";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

import { Button } from "./components/ui/button";

export const Home = async () => {
  const session = await auth();

  const data: any = await fetch(
    "http://localhost:3000/api/projects/66a5e814a17ecb1d7b535051"
    // { next: { revalidate: 3600 } }
  );

  const projects = await data.json();

  const formatDate = (date: Date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("/");
  };

  // console.log(posts);
  const showSession = () => {
    if (session) {
      return (
        <>
          <div className="prose lg:prose:xl">
            <div className="pb-3 pt-20">
              <h1 className="w-full text-xl py-1">
                Welcome, {session.user?.name}
              </h1>

              {projects.length === 0 ? (
                <p className="w-full text-sm flex">
                  Please{" "}
                  <Link href="/project/create" className="px-1 underline">
                    create
                  </Link>{" "}
                  a project to begin.
                </p>
              ) : (
                <p className="w-full text-sm">
                  Please select a project to view details
                </p>
              )}
            </div>

            {projects.length ? (
              <div className="grid grid-cols-3 gap-5 w-full">
                {projects.map((project: any) => {
                  return (
                    <Link href={`/project/${project._id}`}>
                      <Card className="h-full">
                        <CardHeader>
                          <CardTitle>{project.title}</CardTitle>
                          <CardDescription>
                            {project.description}
                          </CardDescription>
                        </CardHeader>
                        {/* <CardContent>
                          <p>Card Content</p>
                        </CardContent> */}
                        <CardFooter>
                          <p className="text-xs text-gray-400">
                            {formatDate(project.startDate)} -{" "}
                            {formatDate(project.endDate)}
                          </p>
                        </CardFooter>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </div>
        </>
      );
    } else {
      return (
        <Link
          href="/login"
          className="border border-solid border-black rounded"
        >
          Sign In
        </Link>
      );
    }
  };
  return (
    <main className="min-h-screen flex flex-col w-full h-full items-center">
      <Navbar username={session?.user?.name || ""}></Navbar>

      <div className="flex max-w-4xl items-center flex-col">
        {showSession()}
      </div>
    </main>
  );
};

export default Home;
