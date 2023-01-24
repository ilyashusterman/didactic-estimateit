import React, { useState } from "react";

interface Task {
  name: string;
  description: string;
  estimatedCost: number;
  estimatedTime: number;
}

interface Props {
  tasks: Task[];
}

const TaskView = (props: Props) => {
  const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);
  const [totalTasks, setTotalTasks] = useState(0);

  const handleSelectTask = (task: Task) => {
    setSelectedTasks([...selectedTasks, task]);
    setTotalTasks(totalTasks + 1);
  };

  return (
    <div>
      <h3>Total Tasks: {totalTasks}</h3>
      <ul>
        {props.tasks.map((task) => (
          <li key={task.name}>
            <TaskComponent task={task} onSelect={handleSelectTask} />
          </li>
        ))}
      </ul>
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
      <button onClick={() => props.onSelect(task)}>Select Task</button>
    </div>
  );
};

export default TaskView;
