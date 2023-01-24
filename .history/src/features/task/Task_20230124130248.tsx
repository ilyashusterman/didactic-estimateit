import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectTasks, selectSystemTasks, addTask } from "./taskSlice";
import TaskCanvas from "./canvas/TaskView";
import CustomizedHook from "./AutoCompleteTask";
import { Task } from "./types";

const TaskView = () => {
  const tasks = useAppSelector(selectTasks);
  const dispatch = useAppDispatch();
  const systemTasks = useAppSelector(selectSystemTasks);

  const handleSelectTask = (task: Task) => {
    dispatch(addTask(task));
  };

  return (
    <div>
      <h3>Total Tasks: {tasks.length}</h3>
      <ul>
        <CustomizedHook />
        {systemTasks.map((task) => (
          <li key={task.name}>
            <TaskComponent task={task} onClick={handleSelectTask} />
          </li>
        ))}
      </ul>
      <div style={{ height: 800 }}>
        <TaskCanvas />
      </div>
    </div>
  );
};

interface TaskProps {
  task: Task;
  onClick: (task: Task) => void;
}

const TaskComponent = (props: TaskProps) => {
  const { task } = props;
  return (
    <div>
      <h4>Task Name: {task.name}</h4>
      <p>Description: {task.description}</p>
      <p>Estimated Cost: {task.cost}</p>
      <p>Estimated Time: {task.time}</p>
      <button onClick={() => props.onClick(task)}>Add Task</button>
    </div>
  );
};

export default TaskView;
