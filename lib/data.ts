import Project from "@/models/Project";
import { connectDB } from "./utils";

export const getProjects = async (userEmail: string) => {
  try {
    connectDB();
    const projects = await Project.find({ owner: userEmail }).exec();
    return projects;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch posts!");
  }
};

export const getProjectById = async (id: string) => {
  try {
    connectDB();
    const project = await Project.findById(id).exec();
    return project;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch posts!");
  }
};
