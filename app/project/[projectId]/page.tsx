"use client";
import { Navbar } from "@/app/components/Header/header";
import { auth } from "@/lib/auth";
import { useEffect, useState } from "react";
import { Button } from "@/app/components/ui/button";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
import createTask from "@/app/components/Task/CreateTask/createTask";
import CreateTask from "@/app/components/Task/CreateTask/createTask";
import { TasksList } from "@/app/components/TasksList/tasksList";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/app/components/ui/card";
import { BarChart } from "lucide-react";
import { ChartConfig, ChartContainer } from "@/app/components/ui/chart";
import { Bar, LabelList, YAxis, XAxis } from "recharts";
import { TaskDocument } from "@/models/Task";

export const Page = ({ params }: { params: { projectId: string } }) => {
  const { projectId } = params;
  const { data, status } = useSession();
  const router = useRouter();

  const [project, setProject] = useState({
    title: "",
    description: "",
  });
  const [tasks, setTasks] = useState([] as any);
  const [isLoading, setLoading] = useState(true);
  const [projectProgress, setProjectProgress] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);

  useEffect(() => {
    fetch(
      `http://localhost:3000/api/projects/${data?.user._id}/${params.projectId}`
    )
      .then((res) => res.json())
      .then(async (data) => {
        const tasks = await getTasks(data._id);
        setProject(data);
        setTasks(tasks);
        const completedTask = tasks.filter(
          (task: TaskDocument) => task.status === "Completed"
        ).length;
        setCompletedTasks(completedTask);
        setLoading(false);
      });
  }, []);

  const getTasks = async (projectId: string) => {
    const tasks = await fetch(
      `http://localhost:3000/api/tasks/all/${projectId}`
    )
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
    return tasks || [];
  };

  const [showTaskForm, setShowTaskForm] = useState(false);

  const toggleTaskForm = () => {
    setShowTaskForm(!showTaskForm);
  };

  const handleProjectCreation = async () => {
    setShowTaskForm(false);
    const tasks = await getTasks(projectId);

    setTasks(tasks);
  };

  const chartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
  ];

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;
  if (isLoading) return <p>Loading...</p>;
  if (!project) return <p>No Matching Project</p>;

  if (status !== "loading" && status !== "authenticated")
    return redirect("/logiin");

  return (
    <main className="flex flex-col w-full h-full items-center">
      <Navbar username={data?.user?.name || ""}></Navbar>

      <div className="grid max-w-6xl py-10 flex-col w-full grid-cols-12 gap-6">
        <div className="title-section col-span-12">
          <div className="grid grid-cols-2">
            <div>
              <h1 className="text-2xl">{project.title}</h1>
              <p className="text-sm">{project.description}</p>
            </div>

            <div className="grid w-full flex-1 gap-6 justify-end">
              <div className="grid auto-rows-min gap-2">
                <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                  {completedTasks}/{tasks.length}
                  <span className="text-sm font-normal text-muted-foreground">
                    tasks completed
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full max-w-6xl items-start gap-6 col-span-2 row-span-4">
          <nav
            className="grid w-full gap-4 text-sm text-muted-foreground bg-gray-100 px-5 py-10"
            x-chunk="dashboard-04-chunk-0"
          >
            {/* <Link href="#" className="font-semibold text-primary">
              General
            </Link> */}
            <button className="text-left" onClick={toggleTaskForm}>
              Add new task
            </button>

            {/* <Link href="#">Support</Link>
            <Link href="#">Organizations</Link>
            <Link href="#">Advanced</Link>
             */}
          </nav>
        </div>
        <div className="col-span-10 grid gap-6">
          {showTaskForm && (
            <CreateTask
              projectId={projectId}
              onProjectCreated={handleProjectCreation}
            />
          )}
          <TasksList tasks={tasks}></TasksList>
        </div>
      </div>
    </main>
  );
};

export default Page;
