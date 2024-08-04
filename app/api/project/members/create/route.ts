import Project from "@/models/Project";
import { connectDB } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest } from "next";

export const POST = async (req: NextRequest, context: any) => {
  const { method } = req;
  const params = await req.json();

  console.log(params);

  const { projectId, name, _id } = params;

  connectDB();

  await connectDB();

  try {
    const project = await Project.findById(projectId).exec();
    console.log(project);

    if (project.members?.indexOf(_id) === -1) {
      project.members = [...project.members, _id];
    }

    const updatedproject = await project.save();

    return NextResponse.json(updatedproject);
  } catch (error) {
    console.log({ error });
    NextResponse.json({ success: false, error: (error as Error).message });
  }
};
