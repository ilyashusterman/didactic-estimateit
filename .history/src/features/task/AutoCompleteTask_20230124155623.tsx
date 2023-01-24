import * as React from "react";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectSystemTasks, selectTasks, updateTasks } from "./taskSlice";
import { Task } from "./types";

const getAncestorTasks = (tasks: Task[]) => {
  const taskMap: { [key: string]: Task } = {};
  tasks.forEach((task) => (taskMap[task.name] = task));
  const ancestorTasks: Task[] = [];
  const visited = new Set<string>();

  const dfs = (task: Task) => {
    if (visited.has(task.name)) return;
    visited.add(task.name);
    if (task.nextTasks.length === 0) ancestorTasks.push(task);
    else task.nextTasks.forEach((name) => dfs(taskMap[name]));
  };

  tasks.forEach((task) => dfs(task));
  return ancestorTasks;
};

export default function AutoCompleteTask() {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectTasks);
  const systemTasks = useAppSelector(selectSystemTasks);
  const options = getAncestorTasks(systemTasks);
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
