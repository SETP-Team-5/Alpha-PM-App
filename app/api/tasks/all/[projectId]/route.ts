import Task from "@/models/Task";
import { connectDB } from "@/lib/utils";
import { getProjects } from "@/lib/data";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export const GET = async (req: Request, context: any) => {
  const { method } = req;

  const { params } = context;

  const { projectId } = params;

  await connectDB();

  try {
    const tasks = await Task.find({ projectId }).exec();

    return NextResponse.json(tasks);
  } catch (error) {
    console.log({ error });
    NextResponse.json({ success: false, error: (error as Error).message });
  }
};
