import { useAppSelector } from "../../../app/hooks";
import { selectTasks } from "../taskSlice";
import { Task } from "../types";

import { useEffect, useState } from "react";
import { useAppSelector } from "./appState";
import { Card, CardContent, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
});

interface Task {
  name: string;
  time: string;
  cost: string;
  description: string;
  nextTasks?: string[];
}

export const TaskEstimation = () => {
  const classes = useStyles();
  const [totalTime, setTotalTime] = useState<string>("");
  const [totalCost, setTotalCost] = useState<string>("");
  const tasks: Task[] = useAppSelector(selectTasks);

  useEffect(() => {
    let time = 0;
    let cost = 0;
    tasks.forEach((task) => {
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
