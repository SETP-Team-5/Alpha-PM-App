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
import { LINK_STYLE, LINK_STYLE_ACTIVE } from "../project/[projectId]/page";

export default function Dashboard() {
  const { data, status } = useSession();
  const router = useRouter();

  const [projects, setProjects] = useState([] as any);
  const [isLoading, setLoading] = useState(true);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [activeTab, setActiveTab] = useState("projects");
  useEffect(() => {
    if (status === "authenticated") {
      fetch(`http://localhost:3000/api/projects/all/${data?.user._id}`)
        .then((res) => res.json())
        .then(async (data) => {
          // const tasks = await getTasks(data._id);
          setProjects(data);
          // setTasks(tasks);
          // const completedTask = tasks.filter(
          //   (task: TaskDocument) => task.status === "Completed"
          // ).length;
          // setCompletedTasks(completedTask);
          setLoading(false);
        });
    }
  }, []);

  if (status === "unauthenticated") {
    return <div>loading...</div>;
  }
  const toggleProjectForm = () => {
    setShowProjectForm(!showProjectForm);
  };

  const handleProjectCreated = (project: ProjectDocument) => {
    setShowProjectForm(false);
    projects.unshift(project);
    setProjects(projects);
  };

  return (
    <>
      {status === "authenticated" ? (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
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
                      activeTab === "projects" ? LINK_STYLE_ACTIVE : LINK_STYLE
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
                  {isLoading ? "Loading" : `Hello, ${data.user?.name}`}
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
                  {projects.length &&
                  !showProjectForm &&
                  activeTab === "projects" ? (
                    <div className="grid grid-cols-3 gap-6 ">
                      {projects.map((project: any) => {
                        return (
                          <Link
                            href={`/project/${project._id}`}
                            className="cursor-pointer"
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
                    !showProjectForm && (
                      <div
                        className="flex flex-1 h-full w-full items-center justify-center rounded-lg border border-dashed shadow-sm"
                        x-chunk="dashboard-02-chunk-1"
                      >
                        <div className="flex flex-col items-center gap-1 text-center">
                          <h3 className="text-2xl font-bold tracking-tight">
                            You have no projects
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Start by creating a new project.
                          </p>
                        </div>
                      </div>
                    )
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
}
