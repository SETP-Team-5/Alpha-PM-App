import mongoose, { Schema, model } from "mongoose";
import User, { UserDocument } from "./User";

export interface TaskDocument {
  _id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
  projectId: string;
  progress: number;
  status:
    | "In Progress"
    | "Completed"
    | "Paused"
    | "Inactive"
    | "Assigned"
    | "Not started";
  assignedUserId: string;
  assignedUserName: string;
}

const TaskSchema = new Schema<TaskDocument>(
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
    projectId: {
      type: String,
      required: [true, "Project ID is required"],
    },
    progress: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    assignedUserId: {
      type: String,
      default: "",
    },
    assignedUserName: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.models?.Task || model<TaskDocument>("Task", TaskSchema);
export default Task;
