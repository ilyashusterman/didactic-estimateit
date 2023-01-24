import TaskCanvas from "./canvas/TaskView";
import AutoCompleteTask from "./AutoCompleteTask";
import { Task } from "./types";
import { TaskEstimation } from "./estimation/TaskEstimation";

const TaskView = () => {
  return (
    <div>
      <ul>
        <AutoCompleteTask />
      </ul>
      <div style={{ height: 800 }}>
        <TaskCanvas />
        <TaskEstimation />
      </div>
    </div>
  );
};

interface TaskProps {
  task: Task;
}

export default TaskView;
