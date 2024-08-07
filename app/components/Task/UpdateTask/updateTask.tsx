"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/app/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";

import { Textarea } from "@/app/components/ui/textarea";
import { useForm } from "react-hook-form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/app/components/ui/calendar";
import { cn } from "@/app/lib";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { format } from "date-fns";
import { UserDocument } from "@/models/User";
import { Task } from "../../TasksList/tasksList";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

const schema = z.coerce.number();

const formSchema = z.object({
  _id: z.string().min(2).max(100),
  title: z.string().min(2).max(100),
  description: z.string().min(0).max(300),
  startDate: z.date(),
  endDate: z.date(),
  progress: z.preprocess((val) => Number(val), z.number().nonnegative()),
  projectId: z.string().min(2).max(100),
  status: z.string().min(2).max(100),
  assignedUserId: z.string().min(0).max(100),
  assignedUserName: z.string().min(0).max(100),
});

const statusOptions = [
  "In Progress",
  "Completed",
  "Paused",
  "Inactive",
  "Assigned",
  "Not started",
];

interface Props {
  task: Task;
  onTaskUpdated: any;
  members?: UserDocument[];
}

const UpdateTask = (props: Props) => {
  const { data, status } = useSession();
  const { task, members } = props;

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      _id: task._id,
      title: task.title,
      description: task.description,
      startDate: new Date(task.startDate),
      endDate: new Date(task.endDate),
      progress: task.progress,
      projectId: task.projectId,
      status: task.status || "Not Started",
      assignedUserId: task.assignedUserId,
      assignedUserName: task.assignedUserName,
    },
  });

  async function onSubmit(formData: any) {
    let assignedUser = members?.find(
      (member) => member._id === formData.assignedUserId
    );
    if (assignedUser) {
      formData.assignedUserName = assignedUser.name;
    }

    fetch(`/api/tasks/update`, {
      method: "POST",

      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data: any) => {
        props.onTaskUpdated(data);
      });
  }

  if (status === "authenticated") {
    return (
      <section className="w-full flex justify-center">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Update Task</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>title</FormLabel>
                      <FormControl>
                        <Input placeholder="Task title ..." {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Add your task description here"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Start Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>End Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="progress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Progress</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Update progress percentage"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select user" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          {statusOptions.map((option) => {
                            return (
                              <SelectItem value={option}>{option}</SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                {members?.length && (
                  <FormField
                    control={form.control}
                    name="assignedUserId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Assign To</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select user" />
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent>
                            {members?.map((member) => {
                              return (
                                <SelectItem value={member._id}>
                                  {member.email}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <Button type="submit">Update</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </section>
    );
  } else {
    return (
      <>
        <h1>Error in form</h1>
      </>
    );
  }
};

export default UpdateTask;
