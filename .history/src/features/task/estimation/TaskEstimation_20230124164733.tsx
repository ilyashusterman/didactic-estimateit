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
        .replace("$", "")
        .replace(",", "")
        .split("-")
        .map((c) => parseFloat(c.trim()));
      // Randomizing a value between the range
      taskCost = Math.random() * (end - start) + start;
    } else {
      taskCost = parseFloat(task.cost.replace("$", "").replace(",", ""));
    }
    totalCost += taskCost;
  });
  return { totalTime, totalCost };
};

export const TaskEstimation = () => {
  const [totalTime, setTotalTime] = useState<string>("");
  const [totalCost, setTotalCost] = useState<string>("");
  const tasks: Task[] = useAppSelector(selectTasks);
  const systemTasks: Task[] = useAppSelector(selectSystemTasks);
  const getTasks = (tasksTo: Task[]) => {
    let tasks: Task[] = [];
    tasksTo.map((task) => {
      tasks.push(task);
      task.nextTasks.map((nextTaskId: any) => {
        const nextTask = systemTasks.find((t) => t.name === nextTaskId);
        if (nextTask) {
          tasks.push(nextTask);
        }
      });
    });
    return tasks;
  };

  useEffect(() => {
    const tasksTree = getTasks(tasks);
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
