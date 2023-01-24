import { useAppSelector } from "../../../app/hooks";
import { selectTasks, selectSystemTasks } from "../taskSlice";

import { useEffect, useState } from "react";
import { Task } from "../types";
import { Card, CardContent, Typography } from "@mui/material";

const calculateTotalTimeAndCost = (tasks: Task[]) => {
  let totalTime = 0;
  let totalCost = 0;
  tasks.forEach((task) => {
    let taskTime = 0;
    let taskCost = 0;
    // Handling time attribute
    if (task.time.includes("-")) {
      // Extracting the range of values
      const [start, end] = task.time.split("-").map((t) => t.trim());
      // Randomizing a value between the range
      taskTime =
        Math.random() * (parseFloat(end) - parseFloat(start)) +
        parseFloat(start);
    } else {
      taskTime = parseFloat(task.time);
    }
    totalTime += taskTime;
    // Handling cost attribute
    if (task.cost.includes("-")) {
      // Extracting the range of values
      const [start, end] = task.cost
        .replaceAll("$", "")
        .split("-")
        .map((c) => parseFloat(c.trim().replace(",", "")));
      debugger;
      // Randomizing a value between the range
      taskCost = Math.random() * (end - start) + start;
    } else {
      taskCost = parseFloat(task.cost.replace("$", "").replace(",", ""));
    }
    totalCost += taskCost;
  });
  return { totalTime, totalCost };
};

const getTreeTasks = (tasks: Task[], systemTasks: Task[]): Task[] => {
  let treeTasks: any[] = [];

  const traverseTasks = (task: Task) => {
    treeTasks.push(task);

    task.nextTasks.forEach((nextTaskId: any, index: number) => {
      const nextTask = systemTasks.find((t) => t.name === nextTaskId);
      if (nextTask) {
        traverseTasks(nextTask);
      }
    });
  };

  tasks.forEach((task, index) => {
    traverseTasks(task);
  });

  return treeTasks;
};

export const TaskEstimation = () => {
  const [totalTime, setTotalTime] = useState<string>("");
  const [totalCost, setTotalCost] = useState<string>("");
  const tasks: Task[] = useAppSelector(selectTasks);
  const systemTasks: Task[] = useAppSelector(selectSystemTasks);

  useEffect(() => {
    const tasksTree = getTreeTasks(tasks, systemTasks);
    const { totalCost, totalTime } = calculateTotalTimeAndCost(tasksTree);
    setTotalTime(`${totalTime} weeks`);
    setTotalCost(`$${totalCost}`);
  }, [tasks]);

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          Total Time: {totalTime}
        </Typography>
        <Typography variant="h5" component="h2">
          Total Cost: {totalCost}
        </Typography>
      </CardContent>
    </Card>
  );
};
