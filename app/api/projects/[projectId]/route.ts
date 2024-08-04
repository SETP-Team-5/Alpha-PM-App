import Project from "@/models/Project";
import { connectDB } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (req: Request, context: any) => {
  const { method } = req;

  const { params } = context;

  const { projectId } = params;

  await connectDB();

  try {
    const projects = await Project.findById(projectId).exec();

    return NextResponse.json(projects);
  } catch (error) {
    console.log({ error });
    NextResponse.json({ success: false, error: (error as Error).message });
  }
};
