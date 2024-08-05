import Project from "@/models/Project";
import { connectDB } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest } from "next";

export const POST = async (req: NextRequest, context: any) => {
  const params = await req.json();

  const { title, description, startDate, endDate, userId, members } = params;

  const createdAt = new Date();
  const updatedAt = new Date();
  connectDB();

  await connectDB();

  try {
    const newProject = new Project({
      title,
      description,
      startDate,
      endDate,
      createdAt,
      updatedAt,
      owner: userId,
      members,
    });
    const project = await newProject.save();
    return NextResponse.json(project);
  } catch (error) {
    console.log({ error });
    NextResponse.json({ success: false, error: (error as Error).message });
  }
};
