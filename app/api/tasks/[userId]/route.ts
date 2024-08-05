import Task from "@/models/Task";
import { connectDB } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (req: Request, context: any) => {
  const { method } = req;

  const { params } = context;

  const { userId } = params;

  await connectDB();

  try {
    const tasks = await Task.find({ assignedUserId: `${userId}` });

    return NextResponse.json(tasks);
  } catch (error) {
    console.log({ error });
    NextResponse.json({ success: false, error: (error as Error).message });
  }
};
