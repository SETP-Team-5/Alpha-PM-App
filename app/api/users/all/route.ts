import User from "@/models/User";
import { connectDB } from "@/lib/utils";
import { getProjects } from "@/lib/data";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export const GET = async (req: Request, context: any) => {
  await connectDB();

  try {
    const users = await User.find().exec();

    return NextResponse.json(users);
  } catch (error) {
    console.log({ error });
    NextResponse.json({ success: false, error: (error as Error).message });
  }
};
