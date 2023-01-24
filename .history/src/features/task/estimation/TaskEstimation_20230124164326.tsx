import { useAppSelector } from "../../../app/hooks";
import { selectTasks, selectSystemTasks } from "../taskSlice";

import { useEffect, useState } from "react";
import { Task } from "../types";
import { makeStyles } from "@mui/material/styles";
import { Card, CardContent, Typography } from "@mui/material";

function calculateTotalTimeAndCost(tasks: Task[]) {
  let totalTime = 0;
  let totalCost = 0;
  tasks.forEach((task) => {
    let time;
    let cost;
    // check if task has a range for time
    if (task.time.indexOf("-") !== -1) {
      const timeRange = task.time.split("-");
      time = randomNumberInRange(
        parseInt(timeRange[0]),
        parseInt(timeRange[1])
      );
    } else {
      time = parseInt(task.time);
    }

    // check if task has a range for cost
    if (task.cost.indexOf("-") !== -1) {
      const costRange = task.cost.split("-");
      cost = randomNumberInRange(
        parseInt(costRange[0]),
        parseInt(costRange[1])
      );
    } else {
      cost = parseInt(task.cost);
    }

    totalTime += time;
    totalCost += cost;
  });
  return { totalTime, totalCost };
}

function randomNumberInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

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
