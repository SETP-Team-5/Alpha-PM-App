"use server";

import { revalidatePath } from "next/cache";

import { connectDB } from "./mongodb";
import Project, { ProjectDocument } from "../models/Project";
import { useSession } from "next-auth/react";
import { authOptions } from "./auth";
import { getServerSession } from "next-auth";
import { FormEvent } from "react";

export const createProject = async (formData: {
  title: string;
  desc: string;
  startDate: Date;
  endDate: Date;
  userId: string;
  members: string[];
}) => {
  // const session = await getServerSession(authOptions);

  const { title, desc, startDate, endDate, userId, members } = formData;

  const createdAt = new Date();
  const updatedAt = new Date();

  try {
    connectDB();
    const newProject = new Project({
      title,
      desc,
      startDate,
      endDate,
      createdAt,
      updatedAt,
      owner: userId,
      members,
    });
    await newProject.save();
    console.log("saved to db");
    // revalidatePath("/projects");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};
