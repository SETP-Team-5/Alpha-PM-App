import Task from "@/models/Task";
import { connectDB } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, context: any) => {
  const params = await req.json();

  const { _id } = params;

  const updatedAt = new Date();
  connectDB();

  await connectDB();

  try {
    const task = await Task.findByIdAndDelete(_id).exec();

    return NextResponse.json({
      success: true,
      messsage: "Succesfully deleted task",
    });
  } catch (error) {
    console.log({ error });
    NextResponse.json({ success: false, error: (error as Error).message });
  }
};
