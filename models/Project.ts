import mongoose, { Schema, model } from "mongoose";
import User, { UserDocument } from "./User";

export interface ProjectDocument {
  _id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
  owner: string;
  members: string[];
}

const ProjectSchema = new Schema<ProjectDocument>(
  {
    title: {
      type: String,
      unique: false,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: false,
    },
    startDate: {
      type: Date,
      required: [true, "Start Date is required"],
    },
    endDate: {
      type: Date,
      required: [true, "Start Date is required"],
    },
    createdAt: {
      type: Date,
      required: [true, "Start Date is required"],
    },
    updatedAt: {
      type: Date,
      required: [true, "Start Date is required"],
    },
    owner: {
      type: String,
      required: true,
    },
    members: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Project =
  mongoose.models?.Project || model<ProjectDocument>("Project", ProjectSchema);
export default Project;
