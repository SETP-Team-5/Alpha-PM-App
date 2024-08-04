import User from "@/models/User";
import { connectDB } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (req: Request, context: any) => {
  const { method } = req;

  const { params } = context;

  const { userId } = params;

  await connectDB();

  try {
    const user = await User.findById(userId).exec();

    return NextResponse.json(user);
  } catch (error) {
    console.log({ error });
    NextResponse.json({ success: false, error: (error as Error).message });
  }
};
