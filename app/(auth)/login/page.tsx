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
const formSchema = z.object({
  email: z.string().email().min(2).max(100),
  password: z.string().min(2).max(300),
});

export default function Login() {
  const { data, status } = useSession();

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [error, setError] = useState("");
  const onSubmit = async (data: any) => {
    const { email, password } = data;
    const res = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });

    if (res?.error) {
      console.log(res.error);
      setError(res.error as string);
    }
    if (res?.ok) {
      return router.push("/dashboard");
    }
  };

  return (
    <>
      {status === "unauthenticated" ? (
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
                <h1 className="text-3xl font-bold">Login</h1>
                <p className="text-balance text-muted-foreground text-sm">
                  Enter your email below to login to your account
                </p>
              </div>
              <div className="grid gap-4">
                {error && <div className="text-black">{error}</div>}
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
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
                      Sign In
                    </Button>
                  </form>
                </Form>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="underline">
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        router.push("/dashboard")
      )}
    </>
  );
}
