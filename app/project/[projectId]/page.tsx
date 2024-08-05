"use client";
import { Navbar } from "@/app/components/Header/header";
import { auth } from "@/lib/auth";
import { useEffect, useState } from "react";
import { Button } from "@/app/components/ui/button";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import createTask from "@/app/components/Task/CreateTask/createTask";
import CreateTask from "@/app/components/Task/CreateTask/createTask";
import { Task, TasksList } from "@/app/components/TasksList/tasksList";
import ProjectOverview, {
  ProgressChart,
} from "@/app/components/ProjectOveview/projectOverview";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/app/components/ui/card";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/sheet";

import { BarChart, ChartNoAxesGantt, Info } from "lucide-react";
import { ChartConfig, ChartContainer } from "@/app/components/ui/chart";
import { Bar, LabelList, YAxis, XAxis } from "recharts";
import { TaskDocument } from "@/models/Task";

import { Input } from "@/app/components/ui/input";
import BreadcrumbNav from "@/app/components/Breadcrumbs/breadcrumbs";
import { Badge } from "@/app/components/ui/badge";

import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  ListTodo,
  LogOut,
  Menu,
  Package,
  Package2,
  Plus,
  Search,
  ShoppingCart,
  SquareChartGantt,
  SquarePlus,
  Users,
} from "lucide-react";
import LogoutButton from "@/app/components/logout/logout";
import { MembersList } from "@/app/components/MembersList/MembersList";
import AddMember from "@/app/components/Member/AddMember/addMember";
import { UserDocument } from "@/models/User";
import { ProjectDocument } from "@/models/Project";
import UpdateTask from "@/app/components/Task/UpdateTask/updateTask";
import AboutProject from "@/app/components/AboutProject/aboutProject";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";

export const LINK_STYLE =
  "flex items-center gap-3 bg-transparent rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted w-full justify-start";
export const LINK_STYLE_ACTIVE =
  "flex items-center gap-3 bg-muted rounded-lg px-3 py-2 text-black transition-all hover:text-primary hover:bg-muted w-full justify-start ";

export const Page = ({ params }: { params: { projectId: string } }) => {
  const { projectId } = params;
  const { data, status } = useSession();
  const router = useRouter();

  const [project, setProject] = useState({
    title: "",
    description: "",
  } as ProjectDocument);
  const [tasks, setTasks] = useState([] as Task[]);
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setLoading] = useState(true);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showUpdateTaskForm, setShowUpdateTaskForm] = useState(false);
  const [showMemberForm, setShowMemberForm] = useState(false);
  const [showDialogue, setShowDialogue] = useState(false);
  const [members, setMembers] = useState([] as UserDocument[]);
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const [selectedTask, setSelectedTask] = useState({});
  const [projectProgress, setProjectProgress] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:3000/api/projects/${params.projectId}`)
      .then((res) => res.json())
      .then(async (data) => {
        const tasks = await getTasks(data._id);
        let members: UserDocument[] = [];

        for (const memberId of data.members) {
          const member = await getMemberInfo(memberId);

          if (member) {
            members.push(member);
          }
        }
        setMembers(members);

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

  const getMemberInfo = async (userId: string) => {
    const member = await fetch(
      `http://localhost:3000/api/project/members/${userId}`
    )
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
    return member || null;
  };

  const toggleTaskForm = () => {
    setShowTaskForm(!showTaskForm);
  };

  const toggleMemberForm = () => {
    setShowMemberForm(!showMemberForm);
  };

  const toggleUpdateTaskForm = (task: Task) => {
    setSelectedTask(task);
    setShowUpdateTaskForm(!showUpdateTaskForm);
  };

  const handleTaskCreation = async (data: Task) => {
    setShowTaskForm(false);
    tasks.unshift(data);

    setTasks(tasks);
  };

  const handleAddedMember = async (data: ProjectDocument) => {
    setShowMemberForm(false);
    let members: UserDocument[] = [];
    for (const memberId of data.members) {
      const member = await getMemberInfo(memberId);

      if (member) {
        members.push(member);
      }
    }

    setMembers(members);
  };

  const handleUpdatedTask = async (data: Task) => {
    tasks.forEach((task: Task, index: number) => {
      if (task._id === data._id) {
        tasks[index] = data;
      }
    });

    setShowUpdateTaskForm(false);
    setTasks([...tasks]);
  };

  const handleDeleteTaskRequest = (task: Task) => {
    setSelectedTaskId(task._id);
    setShowDialogue(true);
  };

  const deleteTask = async () => {
    fetch(`http://localhost:3000/api/tasks/delete`, {
      method: "POST",

      body: JSON.stringify({ _id: selectedTaskId }),
    })
      .then((res) => res.json())
      .then((data: any) => {
        console.log({ data });
        setShowDialogue(false);
        const filteredTask = tasks.filter(
          (task: Task) => task._id !== selectedTaskId
        );
        // setProject(data);
        // setLoading(false);
        setTasks(filteredTask);
      });
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
    return redirect("/login");

  return (
    <>
      {status === "authenticated" ? (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
          <Sheet open={showUpdateTaskForm} onOpenChange={setShowUpdateTaskForm}>
            <SheetContent>
              <UpdateTask
                task={selectedTask as Task}
                onTaskUpdated={handleUpdatedTask}
                members={members}
              />
            </SheetContent>
          </Sheet>

          <Dialog open={showDialogue} onOpenChange={setShowDialogue}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Are you sure you want to delete the task?
                </DialogTitle>

                <DialogFooter>
                  <Button onClick={() => deleteTask()}>Yes</Button>
                </DialogFooter>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <div className="hidden border-r bg-muted/40 md:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
              <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                <Link
                  href="/"
                  className="flex items-center gap-2 font-semibold"
                >
                  <Image
                    src="/alpha-logo.png"
                    alt="Image"
                    width="120"
                    height="120"
                    className="h-[40px] w-[40px] object-cover dark:brightness-[0.2] dark:grayscale"
                  />
                  <span className="">Alpha PM</span>
                </Link>
              </div>
              <div className="flex-1">
                <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                  <Button
                    className={
                      activeTab === "overview" ? LINK_STYLE_ACTIVE : LINK_STYLE
                    }
                    onClick={() => {
                      setActiveTab("overview");
                    }}
                  >
                    <ChartNoAxesGantt className="w-4 h-4" />
                    Overview
                    {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                      6
                    </Badge> */}
                  </Button>

                  <Button
                    className={
                      activeTab === "tasks" ? LINK_STYLE_ACTIVE : LINK_STYLE
                    }
                    onClick={() => {
                      setActiveTab("tasks");
                    }}
                  >
                    <ListTodo className="h-4 w-4" />
                    Tasks
                  </Button>
                  <Button
                    className={
                      activeTab === "members" ? LINK_STYLE_ACTIVE : LINK_STYLE
                    }
                    onClick={() => {
                      setActiveTab("members");
                    }}
                  >
                    <Users className="h-4 w-4" />
                    Members
                  </Button>
                  <Button
                    className={
                      activeTab === "about" ? LINK_STYLE_ACTIVE : LINK_STYLE
                    }
                    onClick={() => {
                      setActiveTab("about");
                    }}
                  >
                    <Info className="h-4 w-4" />
                    About Project
                  </Button>
                </nav>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 md:hidden"
                  >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col">
                  <nav className="grid gap-2 text-lg font-medium">
                    <Button
                      className={
                        activeTab === "overview"
                          ? LINK_STYLE_ACTIVE
                          : LINK_STYLE
                      }
                    >
                      <ChartNoAxesGantt className="w-4 h-4" />
                      Overview
                    </Button>
                    <Button
                      className={
                        activeTab === "tasks" ? LINK_STYLE_ACTIVE : LINK_STYLE
                      }
                    >
                      <ListTodo className="h-4 w-4" />
                      Tasks
                    </Button>
                    <Button
                      className={
                        activeTab === "members" ? LINK_STYLE_ACTIVE : LINK_STYLE
                      }
                    >
                      <Users className="h-4 w-4" />
                      Members
                    </Button>
                    <Button
                      className={
                        activeTab === "about" ? LINK_STYLE_ACTIVE : LINK_STYLE
                      }
                    >
                      <Info className="h-4 w-4" />
                      About Project
                    </Button>
                  </nav>
                </SheetContent>
              </Sheet>
              <div className="w-full flex-1">
                <form>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search products..."
                      className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                    />
                  </div>
                </form>
              </div>

              <LogoutButton>Logout</LogoutButton>
            </header>
            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
              <div className="items-center grid grid-cols-1 gap-6">
                <div className="flex justify-between">
                  <h1 className="text-lg font-semibold md:text-2xl py-2">
                    {isLoading ? "Loading" : `${project.title}`}
                  </h1>
                  {activeTab === "tasks" && (
                    <Button
                      variant={"outline"}
                      className="flex gap-2"
                      onClick={toggleTaskForm}
                    >
                      <Plus /> Create Task
                    </Button>
                  )}
                  {activeTab === "members" && (
                    <Button
                      variant={"outline"}
                      className="flex gap-2"
                      onClick={toggleMemberForm}
                    >
                      <Plus /> Add Member
                    </Button>
                  )}
                </div>
              </div>
              <div className="h-full">
                <>
                  {isLoading ? "Loading" : null}
                  {showTaskForm && (
                    <CreateTask
                      projectId={projectId}
                      onTaskCreated={handleTaskCreation}
                    />
                  )}
                  {showMemberForm && (
                    <AddMember
                      projectId={projectId}
                      onMemberAdded={handleAddedMember}
                    />
                  )}
                  {activeTab === "tasks" &&
                    !showTaskForm &&
                    !showMemberForm && (
                      <TasksList
                        tasks={tasks}
                        editTask={toggleUpdateTaskForm}
                        deleteTask={handleDeleteTaskRequest}
                      ></TasksList>
                    )}

                  {activeTab === "members" &&
                    !showTaskForm &&
                    !showMemberForm && (
                      <MembersList members={members}></MembersList>
                    )}

                  {activeTab === "about" &&
                    !showTaskForm &&
                    !showMemberForm && (
                      <AboutProject project={project}></AboutProject>
                    )}

                  {activeTab === "overview" &&
                    !showTaskForm &&
                    !showMemberForm && (
                      <ProjectOverview
                        tasks={tasks}
                        project={project}
                        members={members}
                      />
                    )}
                </>
              </div>
            </main>
          </div>
        </div>
      ) : (
        router.push("/login")
      )}
    </>
  );
};

export default Page;
