import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectTasks, selectSystemTasks, addTask } from "./taskSlice";
import TaskCanvas from "./canvas/TaskView";
import AutoCompleteTask from "./AutoCompleteTask";
import { Task } from "./types";

const TaskView = () => {
  const tasks = useAppSelector(selectTasks);
  const dispatch = useAppDispatch();

  return (
    <div>
      <h3>Total Tasks: {tasks.length}</h3>
      <ul>
        <AutoCompleteTask />
      </ul>
      <div style={{ height: 800 }}>
        <TaskCanvas />
      </div>
    </div>
  );
};

interface TaskProps {
  task: Task;
}

export default TaskView;
