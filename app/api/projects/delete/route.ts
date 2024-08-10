import Project from "@/models/Project";
import { connectDB } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import Task from "@/models/Task";

export const POST = async (req: NextRequest, context: any) => {
  const params = await req.json();

  const { _id } = params;

  const updatedAt = new Date();
  connectDB();

  await connectDB();

  try {
    const project = await Project.findByIdAndDelete(_id).exec();
    const task = await Task.deleteMany({ projectId: _id });

    return NextResponse.json({
      success: true,
      messsage: "Succesfully deleted Project and related tasks",
    });
  } catch (error) {
    console.log({ error });
    NextResponse.json({ success: false, error: (error as Error).message });
  }
};
