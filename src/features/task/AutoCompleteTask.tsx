import * as React from "react";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectSystemTasks, selectTasks, updateTasks } from "./taskSlice";
import { Task } from "./types";

const getRootTasks = (tasks: Task[]) => {
  const childToParentMap = new Map<string, string>();
  tasks.forEach((task) => {
    task.nextTasks.forEach((nextTaskName) => {
      childToParentMap.set(nextTaskName, task.name);
    });
  });
  const rootTasks = tasks.filter((task) => !childToParentMap.has(task.name));
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
