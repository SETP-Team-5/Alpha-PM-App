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
import {
  Calendar as CalendarIcon,
  Check,
  CheckIcon,
  ChevronsUpDown,
} from "lucide-react";
import { Calendar } from "@/app/components/ui/calendar";
import { cn } from "@/app/lib";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { format } from "date-fns";
import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Command,
} from "../../ui/command";
import { useEffect, useState } from "react";
import { UserDocument } from "@/models/User";

const formSchema = z.object({
  email: z.string().email().min(3).max(200),
});

interface Props {
  projectId: string;
  onMemberAdded: any;
}

const AddMemberForm = (props: Props) => {
  const { data, status } = useSession();
  const { projectId } = props;

  const router = useRouter();

  const languages = [
    { label: "English", value: "en" },
    { label: "French", value: "fr" },
    { label: "German", value: "de" },
    { label: "Spanish", value: "es" },
    { label: "Portuguese", value: "pt" },
    { label: "Russian", value: "ru" },
    { label: "Japanese", value: "ja" },
    { label: "Korean", value: "ko" },
    { label: "Chinese", value: "zh" },
  ] as const;

  const [users, setUsers] = useState([] as any);

  useEffect(() => {
    fetch(`/api/users/all`)
      .then((res) => res.json())
      .then(async (data) => {
        setUsers(data);
      });
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(formData: { email: string }) {
    const { _id, name } = users.find(
      (user: any) => user.email === formData.email
    );

    const requestData = { name, _id, projectId };

    fetch(`/api/project/members/create`, {
      method: "POST",

      body: JSON.stringify(requestData),
    })
      .then((res) => res.json())
      .then((data: any) => {
        props.onMemberAdded(data);
        // setProject(data);
        // setLoading(false);
      });
    // useEffect(() => {

    // }, []);
  }

  if (status === "authenticated") {
    return (
      <section className="w-full flex justify-center">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Add New Member</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 w-12"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Email</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-[300px] justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? field.value : "Select User"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[300px] p-0">
                          <Command>
                            <CommandInput placeholder="Search users..." />
                            <CommandList>
                              <CommandEmpty>No user found.</CommandEmpty>
                              <CommandGroup>
                                {users.map(
                                  ({ email }: UserDocument, index: number) => (
                                    <CommandItem
                                      value={`${email}`}
                                      key={index}
                                      onSelect={() => {
                                        form.setValue("email", `${email}`);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          email === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                      {email}
                                    </CommandItem>
                                  )
                                )}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </section>
    );
  } else {
    return (
      <>
        <h1>User is not authenticated</h1>
      </>
    );
  }
};

export default AddMemberForm;

// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { Check, ChevronsUpDown } from "lucide-react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// import { cn } from "@/app/lib";
// import { Button } from "@/app/components/ui/button";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/app/components/ui/command";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/app/components/ui/form";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/app/components/ui/popover";
// import { toast } from "@/app/components/ui/use-toast";

// const languages = [
//   { label: "English", value: "en" },
//   { label: "French", value: "fr" },
//   { label: "German", value: "de" },
//   { label: "Spanish", value: "es" },
//   { label: "Portuguese", value: "pt" },
//   { label: "Russian", value: "ru" },
//   { label: "Japanese", value: "ja" },
//   { label: "Korean", value: "ko" },
//   { label: "Chinese", value: "zh" },
// ] as const;

// const FormSchema = z.object({
//   language: z.string({
//     required_error: "Please select a language.",
//   }),
// });

// export default function CreateTask() {
//   const form = useForm<z.infer<typeof FormSchema>>({
//     resolver: zodResolver(FormSchema),
//   });

//   function onSubmit(data: z.infer<typeof FormSchema>) {
//     toast({
//       title: "You submitted the following values:",
//       description: (
//         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
//           <code className="text-white">{JSON.stringify(data, null, 2)}</code>
//         </pre>
//       ),
//     });
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//         <FormField
//           control={form.control}
//           name="language"
//           render={({ field }) => (
//             <FormItem className="flex flex-col">
//               <FormLabel>Language</FormLabel>
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <FormControl>
//                     <Button
//                       variant="outline"
//                       role="combobox"
//                       className={cn(
//                         "w-[200px] justify-between",
//                         !field.value && "text-muted-foreground"
//                       )}
//                     >
//                       {field.value
//                         ? languages.find(
//                             (language) => language.value === field.value
//                           )?.label
//                         : "Select language"}
//                       <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//                     </Button>
//                   </FormControl>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-[200px] p-0">
//                   <Command>
//                     <CommandInput placeholder="Search language..." />
//                     <CommandList>
//                       <CommandEmpty>No language found.</CommandEmpty>
//                       <CommandGroup>
//                         {languages.map((language) => (
//                           <CommandItem
//                             value={language.label}
//                             key={language.value}
//                             onSelect={() => {
//                               form.setValue("language", language.value);
//                             }}
//                           >
//                             <Check
//                               className={cn(
//                                 "mr-2 h-4 w-4",
//                                 language.value === field.value
//                                   ? "opacity-100"
//                                   : "opacity-0"
//                               )}
//                             />
//                             {language.label}
//                           </CommandItem>
//                         ))}
//                       </CommandGroup>
//                     </CommandList>
//                   </Command>
//                 </PopoverContent>
//               </Popover>
//               <FormDescription>
//                 This is the language that will be used in the dashboard.
//               </FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <Button type="submit">Submit</Button>
//       </form>
//     </Form>
//   );
// }
