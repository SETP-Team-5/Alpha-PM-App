import Project from "@/models/Project";
import { connectDB } from "@/lib/utils";
import { getProjects } from "@/lib/data";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export const GET = async (req: Request, context: any) => {
  const { method } = req;

  const { params } = context;
  console.log(params);
  const { projectId } = params;

  await connectDB();

  try {
    const project = await Project.findById(projectId).exec();

    return NextResponse.json(project);
  } catch (error) {
    console.log({ error });
    NextResponse.json({ success: false, error: (error as Error).message });
  }
};
