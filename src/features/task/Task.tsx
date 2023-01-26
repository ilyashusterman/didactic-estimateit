import TaskCanvas from "./canvas/TaskView";
import AutoCompleteTask from "./AutoCompleteTask";
import { TaskEstimation } from "./estimation/TaskEstimation";
import styled from "styled-components";

const Box = styled.div<{ isCentered: boolean }>`
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;
`;

const TaskView = () => {
  return (
    <div>
      <Box isCentered={true}>
        <AutoCompleteTask />
        <div style={{ height: 800, width: "100%" }}>
          <TaskCanvas />
        </div>
        <TaskEstimation />
      </Box>
    </div>
  );
};

export default TaskView;
