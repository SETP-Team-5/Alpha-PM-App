"use client";
import { createProject } from "@/lib/action";
import { stat } from "fs";
import { Router } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

const createProjectForm = () => {
  const { data, status } = useSession();
  const router = useRouter();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const start = formData.get("startDate");
    const end = formData.get("endDate");
    let project = await createProject({
      title: formData.get("title") as string,
      desc: formData.get("desc") as string,
      startDate: new Date(start as string),
      endDate: new Date(end as string),
      userId: data?.user?.email || "",
      members: [],
    });
    console.log("project", project);
  }

  if (status === "authenticated") {
    return (
      <section className="w-full h-screen flex items-center justify-center">
        <div>
          <form onSubmit={onSubmit} className="grid gap-2">
            <input
              className="w-full h-8 border border-solid border-black py-1 px-2.5 rounded text-[13px]"
              type="text"
              placeholder="title"
              name="title"
            />
            <textarea
              className="w-full h-16 border border-solid border-black py-1 px-2.5 rounded text-[13px]"
              placeholder="desc"
              name="desc"
            />
            <input
              className="w-full h-8 border border-solid border-black py-1 px-2.5 rounded text-[13px]"
              type="date"
              placeholder="startDate"
              name="startDate"
            />
            <input
              className="w-full h-8 border border-solid border-black py-1 px-2.5 rounded text-[13px]"
              type="date"
              placeholder="endDate"
              name="endDate"
            />

            <button className="w-full border border-solid border-black rounded">
              Create
            </button>
          </form>

          {/* <form action={deletePost}>
              <input type="text" placeholder="postId" name="id" />
              <button>Delete</button>
            </form> */}
        </div>
      </section>
    );
  }
};

export default createProjectForm;
