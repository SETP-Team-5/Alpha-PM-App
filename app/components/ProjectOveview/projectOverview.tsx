"use client";

import { TrendingUp } from "lucide-react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { ChartConfig, ChartContainer } from "@/app/components/ui/chart";
import { UserDocument } from "@/models/User";
import { Task } from "../TasksList/tasksList";
import { ProjectDocument } from "@/models/Project";
const chartData = [
  { browser: "safari", visitors: 1260, fill: "var(--color-safari)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

interface ProgressChartProps {
  progress: number;
  taskSatusNumbers: any;
}

interface Props {
  tasks: Task[];
  members: UserDocument[];
  project: ProjectDocument;
}

export function ProgressChart(props: ProgressChartProps) {
  const { progress, taskSatusNumbers } = props;

  const endAngle = (360 * progress) / 100;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="w-full">Progress</CardTitle>
        {/* <CardDescription></CardDescription> */}
      </CardHeader>
      <CardContent className="flex-1 pb-0 p-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={endAngle}
            innerRadius={80}
            outerRadius={140}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="visitors" background />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {progress}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Completed
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  );
}

const ProjectOverview = (props: Props) => {
  const { tasks, members, project } = props;

  const taskStatus: Task["status"][] = [
    "In Progress",
    "Completed",
    "Paused",
    "Inactive",
    "Assigned",
    "Not started",
  ];

  const taskGrouped: any = {};

  taskStatus.forEach((status) => (taskGrouped[status] = 0));

  tasks.forEach((task) => {
    taskGrouped[task.status] += 1;
  });

  let taskStatusNumbers: any = [];

  Object.keys(taskGrouped).forEach((item) => {
    taskStatusNumbers.push({
      label: item,
      value: taskGrouped[item],
    });
  });

  return (
    <div className="grid grid-cols-2 gap-4 ">
      <ProgressChart
        progress={
          taskGrouped.Completed
            ? Math.round((taskGrouped.Completed / tasks.length) * 100)
            : 0
        }
        taskSatusNumbers={taskStatusNumbers}
      ></ProgressChart>
      <div className="grid grid-cols-3 border">
        {taskStatusNumbers.map((item: any) => {
          return (
            <div className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left border-b even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
              <span className="text-xs text-muted-foreground">
                {item.label}
              </span>
              <span className="text-lg font-bold leading-none sm:text-3xl">
                {item.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectOverview;
