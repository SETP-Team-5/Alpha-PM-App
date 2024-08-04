import Task from "@/models/Task";
import { connectDB } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, context: any) => {
  const { method } = req;
  const params = await req.json();

  const {
    _id,
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

  const updatedAt = new Date();
  connectDB();

  await connectDB();

  try {
    const task = await Task.findById(_id).exec();

    task.title = title;
    task.description = description;
    task.startDate = startDate;
    task.endDate = endDate;
    task.progress = progress;
    task.status = status;
    task.assignedUserId = assignedUserId;
    task.assignedUserName = assignedUserName;
    task.updatedAt = updatedAt;

    const updatedTask = await task.save();

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.log({ error });
    NextResponse.json({ success: false, error: (error as Error).message });
  }
};
