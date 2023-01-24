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
      <div style={{ height: 400 }}>
        <TaskCanvas />
        <TaskEstimation />
      </div>
    </div>
  );
};

export default TaskView;
