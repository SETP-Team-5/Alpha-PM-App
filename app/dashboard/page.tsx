"use client";

import Link from "next/link";
import Image from "next/image";
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

import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Input } from "@/app/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/app/components/ui/sheet";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LogoutButton from "../components/logout/logout";
import { formatDate } from "@/lib/utils";
import CreateProject from "../components/Project/CreateProject/createProject";
import { ProjectDocument } from "@/models/Project";

import { Task, TasksList } from "../components/TasksList/tasksList";
import UpdateTask from "../components/Task/UpdateTask/updateTask";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { LINK_STYLE_ACTIVE, LINK_STYLE } from "@/lib/constants";

export default function Dashboard() {
  const session = useSession();
  const status = session.status;
  const sessionData = session.data as any;

  const router = useRouter();

  const [projects, setProjects] = useState([] as any);
  const [tasks, setTasks] = useState([] as any);
  const [isLoading, setLoading] = useState(true);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [activeTab, setActiveTab] = useState("projects");
  const [showUpdateTaskForm, setShowUpdateTaskForm] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const [selectedTask, setSelectedTask] = useState({});
  const [showDialogue, setShowDialogue] = useState(false);

  useEffect(() => {
    if (status === "authenticated" && sessionData?.user?._id) {
      console.log("effect runnign");
      fetch(`/api/projects/all/${sessionData?.user._id}`)
        .then((res) => res.json())
        .then(async (data: any) => {
          setProjects(data);
          await fetch(`/api/tasks/${sessionData?.user._id}`)
            .then((res) => res.json())
            .then(async (data) => {
              setTasks(data);

              setLoading(false);
            });
        });
    }
  }, [sessionData?.user?._id, status]);

  if (status === "unauthenticated") {
    return router.push("/login");
  }

  if (status === "loading") {
    return <div>Loading....</div>;
  }
  // useEffect(() => {
  //   if (status === "authenticated") {

  //   }
  // }, []);

  const toggleProjectForm = () => {
    setShowProjectForm(!showProjectForm);
  };

  const handleProjectCreated = (project: ProjectDocument) => {
    setShowProjectForm(false);
    projects.unshift(project);
    setProjects(projects);
  };

  const toggleUpdateTaskForm = (task: Task) => {
    setSelectedTask(task);
    setShowUpdateTaskForm(!showUpdateTaskForm);
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
    fetch(`/api/tasks/delete`, {
      method: "POST",

      body: JSON.stringify({ _id: selectedTaskId }),
    })
      .then((res) => res.json())
      .then((data: any) => {
        setShowDialogue(false);
        const filteredTask = tasks.filter(
          (task: Task) => task._id !== selectedTaskId
        );
        // setProject(data);
        // setLoading(false);
        setTasks(filteredTask);
      });
  };

  return (
    <>
      {
        status === "authenticated" ? (
          <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <Sheet
              open={showUpdateTaskForm}
              onOpenChange={setShowUpdateTaskForm}
            >
              <SheetContent>
                <UpdateTask
                  task={selectedTask as Task}
                  onTaskUpdated={handleUpdatedTask}
                  // members={members}
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
                        activeTab === "projects"
                          ? LINK_STYLE_ACTIVE
                          : LINK_STYLE
                      }
                      onClick={() => {
                        setActiveTab("projects");
                      }}
                    >
                      <Users className="h-4 w-4" />
                      My Projects
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
                      My Tasks
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
                      <Link
                        href="#"
                        className="flex items-center gap-2 text-lg font-semibold"
                      >
                        <Package2 className="h-6 w-6" />
                        <span className="sr-only">Acme Inc</span>
                      </Link>
                      <Link
                        href="#"
                        className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                      >
                        <Home className="h-5 w-5" />
                        Dashboard
                      </Link>
                      <Link
                        href="#"
                        className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                      >
                        <ShoppingCart className="h-5 w-5" />
                        Orders
                        <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                          6
                        </Badge>
                      </Link>
                      <Link
                        href="#"
                        className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                      >
                        <Package className="h-5 w-5" />
                        Products
                      </Link>
                      <Link
                        href="#"
                        className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                      >
                        <Users className="h-5 w-5" />
                        Customers
                      </Link>
                      <Link
                        href="#"
                        className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                      >
                        <LineChart className="h-5 w-5" />
                        Analytics
                      </Link>
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
                <div className="flex items-center justify-between">
                  <h1 className="text-lg font-semibold md:text-2xl">
                    {isLoading ? "Loading" : `Hello, ${sessionData.user?.name}`}
                  </h1>
                  <Button
                    variant={"outline"}
                    className="flex gap-2"
                    onClick={toggleProjectForm}
                  >
                    <Plus /> Create Project
                  </Button>
                </div>
                <div className="h-full">
                  <>
                    {showProjectForm && (
                      <CreateProject onProjectCreated={handleProjectCreated} />
                    )}
                    {activeTab === "tasks" && !showProjectForm && (
                      <TasksList
                        tasks={tasks}
                        editTask={toggleUpdateTaskForm}
                        deleteTask={handleDeleteTaskRequest}
                        memberType={"member"}
                      ></TasksList>
                    )}
                    {projects.length &&
                    !showProjectForm &&
                    activeTab === "projects" ? (
                      <div className="grid grid-cols-3 gap-6 ">
                        {projects.map((project: any, index: number) => {
                          return (
                            <Link
                              href={`/project/${project._id}`}
                              className="cursor-pointer"
                              key={index}
                            >
                              <Card className="h-full items-between grid grid-cols-1 grid-rows-4">
                                <CardHeader className="row-span-3">
                                  <CardTitle>{project.title}</CardTitle>
                                  <CardDescription>
                                    {project.description}
                                  </CardDescription>
                                </CardHeader>

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
                    ) : (
                      !showProjectForm &&
                      !tasks.length && (
                        <div
                          className="flex flex-1 h-full w-full items-center justify-center rounded-lg border border-dashed shadow-sm"
                          x-chunk="dashboard-02-chunk-1"
                        >
                          <div className="flex flex-col items-center gap-1 text-center">
                            <h3 className="text-2xl font-bold tracking-tight">
                              You have no {activeTab}
                            </h3>
                            {activeTab === "projects" && (
                              <p className="text-sm text-muted-foreground">
                                Start by creating a new project.
                              </p>
                            )}
                          </div>
                        </div>
                      )
                    )}
                  </>
                </div>
              </main>
            </div>
          </div>
        ) : null
        // router.push("/login")
      }
    </>
  );
}
