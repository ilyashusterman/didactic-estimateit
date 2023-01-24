import { useAppSelector } from "../../../app/hooks";
import { selectTasks, selectSystemTasks } from "../taskSlice";

import { useEffect, useState } from "react";
import { Task } from "../types";
import { makeStyles } from "@mui/material/styles";
import { Card, CardContent, Typography } from "@mui/material";

function calculateTotalTimeAndCost(tasks: any[]) {
  let totalTime = 0;
  let totalCost = 0;

  tasks.forEach((task) => {
    // Handle time value
    let timeValue = task.time;
    if (timeValue.includes("-")) {
      let timeValues = timeValue.split("-");
      let minTime = parseFloat(timeValues[0]);
      let maxTime = parseFloat(timeValues[1]);
      timeValue = minTime + Math.random() * (maxTime - minTime);
    } else {
      timeValue = parseFloat(timeValue);
    }
    totalTime += timeValue;

    // Handle cost value
    let costValue = task.cost;
    if (costValue.includes("-")) {
      let costValues = costValue.split("-");
      let minCost = parseFloat(costValues[0]);
      let maxCost = parseFloat(costValues[1]);
      costValue = minCost + Math.random() * (maxCost - minCost);
    } else {
      costValue = parseFloat(costValue);
    }
    totalCost += costValue;
  });

  return {
    totalTime,
    totalCost,
  };
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
