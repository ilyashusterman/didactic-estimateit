import { useAppSelector } from "../../../app/hooks";
import { selectTasks, selectSystemTasks } from "../taskSlice";

import { useEffect, useState } from "react";
import { Card, CardContent, Typography, makeStyles } from "@material-ui/core";
import { Task } from "../types";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
});

export const TaskEstimation = () => {
  const classes = useStyles();
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
    let time = 0;
    let cost = 0;
    const tasksTree = getTasks(tasks);
    tasksTree.forEach((task) => {
      // Parse time string to number
      const timeMatch = task.time.match(/\d+/);
      if (timeMatch) {
        time += parseInt(timeMatch[0]);
      }
      // Parse cost string to number
      const costMatch = task.cost.match(/\d+/);
      if (costMatch) {
        cost += parseInt(costMatch[0]);
      }
    });
    setTotalTime(`${time} weeks`);
    setTotalCost(`$${cost}`);
  }, [tasks]);

  return (
    <Card className={classes.root}>
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
