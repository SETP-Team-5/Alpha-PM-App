import Task from "@/models/Task";
import { connectDB } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest } from "next";

// export const GET = async (req: Request, context: any) => {
//   const { method } = req;

//   const { params } = context;

//   const { projectId } = params;

//   await connectDB();

//   try {
//     const tasks = await Task.find({ projectId: projectId }).exec();

//     return NextResponse.json(tasks);
//   } catch (error) {
//     console.log({ error });
//     NextResponse.json({ success: false, error: (error as Error).message });
//   }
// };

export const POST = async (req: NextRequest, context: any) => {
  const { method } = req;
  const params = await req.json();

  const {
    projectId,
    title,
    description,
    startDate,
    endDate,
    progress,
    status,
    assignedUserId,
    assignedUserName,
  } = params;

  const createdAt = new Date();
  const updatedAt = new Date();
  connectDB();

  await connectDB();

  try {
    const newTask = new Task({
      title,
      description,
      startDate,
      endDate,
      createdAt,
      updatedAt,
      projectId,
      progress,
      status,
      assignedUserId,
      assignedUserName,
    });
    const task = await newTask.save();

    return NextResponse.json(task);
  } catch (error) {
    console.log({ error });
    NextResponse.json({ success: false, error: (error as Error).message });
  }
};
