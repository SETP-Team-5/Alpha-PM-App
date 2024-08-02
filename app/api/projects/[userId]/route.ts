import Project from "@/models/Project";
import { connectDB } from "@/lib/utils";
import { getProjects } from "@/lib/data";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export const GET = async (req: Request, context: any) => {
  const { method } = req;

  const { params } = context;
  console.log(params);
  const { userId } = params;

  await connectDB();

  try {
    const projects = await Project.find({ owner: userId }).exec();

    return NextResponse.json(projects);
  } catch (error) {
    console.log({ error });
    NextResponse.json({ success: false, error: (error as Error).message });
  }
};
// Handles GET requests to /api
// export async function GET(request: Request) {
//   return new Response("Hello, Next.js!", {
//     status: 200,
//     headers: { referer: "hellooooo" },
//   });
// }
