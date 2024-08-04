"use client";
import { FormEvent, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/app/components/ui/button";
import Image from "next/image";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { useForm } from "react-hook-form";
import { auth } from "@/lib/auth";
import { register } from "@/actions/register";
const formSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().min(2).max(100),
  password: z.string().min(2).max(300),
});

export default function Register() {
  const { data, status } = useSession();

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const [error, setError] = useState("");

  const onSubmit = async (data: any) => {
    const { name, email, password } = data;
    const res = await register({
      name: name,
      email: email,
      password: password,
      redirect: false,
    });
    console.log(res);

    if (res?.error) {
      setError(res.error);
      return;
    } else {
      return router.push("/login");
    }
  };

  return (
    <div className="w-full h-full lg:grid  lg:grid-cols-2 lg:min-h-screen">
      <div className="hidden bg-muted lg:flex items-center justify-center w-full lg:flex-col">
        <Image
          src="/alpha-logo.png"
          alt="Image"
          width="120"
          height="120"
          className="h-[100px] w-[100px] object-cover dark:brightness-[0.2] dark:grayscale"
        />
        <p className="font-bold text-lg">Alpha PM</p>
        <p className="text-slate-800 text-sm">
          The Apex of Project Management.
        </p>
        <p></p>
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="text-balance text-muted-foreground text-sm">
              Join Alpha PM today and take the first step towards effortless
              project management.
            </p>
          </div>
          <div className="grid gap-4">
            {error && <div className="text-black">{error}</div>}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="m@example.com" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input id="password" type="password" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full cursor-pointer">
                  Register
                </Button>
              </form>
            </Form>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// "use client";
// import { FormEvent, useRef, useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { register } from "../../../actions/register";

// export default function Register() {
//   const [error, setError] = useState<string>();
//   const router = useRouter();
//   const ref = useRef<HTMLFormElement>(null);
//   const handleSubmit = async (formData: FormData) => {
//     const r = await register({
//       email: formData.get("email"),
//       password: formData.get("password"),
//       name: formData.get("name"),
//     });
//     ref.current?.reset();
//     if (r?.error) {
//       setError(r.error);
//       return;
//     } else {
//       return router.push("/login");
//     }
//   };
//   return (
//     <section className="w-full h-screen flex items-center justify-center">
//       <form
//         ref={ref}
//         action={handleSubmit}
//         className="p-6 w-full max-w-[400px] flex flex-col justify-between items-center gap-2
//             border border-solid border-black bg-white rounded"
//       >
//         {error && <div className="">{error}</div>}
//         <h1 className="mb-5 w-full text-2xl font-bold">Register</h1>

//         <label className="w-full text-sm">Full Name</label>
//         <input
//           type="text"
//           placeholder="Full Name"
//           className="w-full h-8 border border-solid border-black py-1 px-2.5 rounded text-[13px]"
//           name="name"
//         />

//         <label className="w-full text-sm">Email</label>
//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full h-8 border border-solid border-black py-1 px-2.5 rounded"
//           name="email"
//         />

//         <label className="w-full text-sm">Password</label>
//         <div className="flex w-full">
//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full h-8 border border-solid border-black py-1 px-2.5 rounded"
//             name="password"
//           />
//         </div>

//         <button
//           className="w-full border border-solid border-black py-1.5 mt-2.5 rounded
//             transition duration-150 ease hover:bg-black"
//         >
//           Sign up
//         </button>

//         <Link
//           href="/login"
//           className="text-sm text-[#888] transition duration-150 ease hover:text-black"
//         >
//           Already have an account?
//         </Link>
//       </form>
//     </section>
//   );
// }
