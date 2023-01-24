import * as React from "react";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectSystemTasks, selectTasks, updateTasks } from "./taskSlice";
import { Task } from "./types";

const getRootTasks = (tasks: Task[]): Task[] => {
  const visitedTasks = new Set<string>();
  const rootTasks: Task[] = [];

  const visit = (task: Task) => {
    if (!task) return;
    if (visitedTasks.has(task.name)) return;
    visitedTasks.add(task.name);
    for (const nextTask of task.nextTasks) {
      visit(tasks.find((t: any) => t.name === nextTask));
    }
    if (!task.nextTasks.length) {
      rootTasks.push(task);
    }
  };

  tasks.forEach(visit);
  return rootTasks;
};

export default function AutoCompleteTask() {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectTasks);
  const systemTasks = useAppSelector(selectSystemTasks);
  const options = getRootTasks(systemTasks);
  const handleUpdateTasks = (tasks: Task[]) => {
    dispatch(updateTasks(tasks));
  };

  return (
    <Stack spacing={3} sx={{ width: 500 }}>
      <Autocomplete
        multiple
        id="tasks-outlined"
        options={options}
        getOptionLabel={(option) => option.name}
        defaultValue={tasks}
        onChange={(event, newTasks) => {
          handleUpdateTasks(newTasks);
        }}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField {...params} label="Tasks" placeholder="select tasks" />
        )}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => (
            <Chip
              color="primary"
              variant="outlined"
              label={option.name}
              {...getTagProps({ index })}
            />
          ))
        }
      />
    </Stack>
  );
}
