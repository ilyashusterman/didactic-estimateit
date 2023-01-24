import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectTasks, selectSystemTasks, addTask } from "./taskSlice";
import { TaskDiagram } from "./TaskNode";

interface Task {
  name: string;
  description: string;
  estimatedCost: number;
  estimatedTime: number;
}

interface Props {
  tasks: Task[];
}

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
        {systemTasks.map((task) => (
          <li key={task.name}>
            <TaskComponent task={task} onSelect={handleSelectTask} />
          </li>
        ))}
      </ul>
      {tasks.map((task) => {
        return <div key={task.name}></div>;
      })}
      <TaskDiagram tasks={tasks} />
    </div>
  );
};

interface TaskProps {
  task: Task;
  onSelect: (task: Task) => void;
}

const TaskComponent = (props: TaskProps) => {
  const { task } = props;
  return (
    <div>
      <h4>Task Name: {task.name}</h4>
      <p>Description: {task.description}</p>
      <p>Estimated Cost: {task.estimatedCost}</p>
      <p>Estimated Time: {task.estimatedTime}</p>
      <button onClick={() => props.onSelect(task)}>Add Task</button>
    </div>
  );
};

export default TaskView;
