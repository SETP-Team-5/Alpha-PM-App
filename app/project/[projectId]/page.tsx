"use client";
import { Navbar } from "@/app/components/Header/header";
import { auth } from "@/lib/auth";
import { useEffect, useState } from "react";
import { Button } from "@/app/components/ui/button";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

export const Page = ({ params }: { params: { projectId: string } }) => {
  const { data, status } = useSession();
  const router = useRouter();

  const [project, setProject] = useState({
    title: "",
    description: "",
  });
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `http://localhost:3000/api/projects/${data?.user._id}/${params.projectId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProject(data);
        setLoading(false);
      });
  }, []);

  const [showTaskForm, setShowTaskForm] = useState(false);

  const toggleTaskForm = () => {
    setShowTaskForm(!showTaskForm);
  };

  if (isLoading) return <p>Loading...</p>;
  if (!project) return <p>No Matching Project</p>;
  if (status !== "loading" && status !== "authenticated")
    return redirect("/logiin");

  return (
    <main className="min-h-screen flex flex-col w-full h-full items-center">
      <Navbar username={data?.user?.name || ""}></Navbar>

      <div className="flex max-w-4xl py-10 flex-col w-full">
        <h1 className="text-2xl ">{project.title}</h1>
        <p className="text-sm">{project.description}</p>
        <Button onClick={toggleTaskForm}>Toggle</Button>
        {showTaskForm && <h1>hellow</h1>}
      </div>
    </main>
  );
};

export default Page;
