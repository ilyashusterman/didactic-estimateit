import {
  DiagramEngine,
  DiagramModel,
  DefaultNodeModel,
} from "@projectstorm/react-diagrams";
import { CanvasWidget } from "@projectstorm/react-canvas-core";

interface TaskNodeProps {
  id: string;
  task: string;
  description: string;
  name: string;
  cost: number;
  time: number;
}

class TaskNodeModel extends DefaultNodeModel {
  constructor(taskProps: TaskNodeProps) {
    super({
      type: "task",
      ...taskProps,
    });
  }
}

// Render the Diagram using the DiagramEngine
interface TaskNodeSProps {
  tasks: TaskNodeProps[];
}
export const TaskDiagram = ({ tasks }: TaskNodeSProps) => {
  const engine = new DiagramEngine();
  const model = new DiagramModel();
  const tasksNodes = tasks.map((task) => {
    return new TaskNodeModel({
      ...task,
    });
  });
  model.addAll(...tasksNodes);
  engine.setModel(model);
  return <CanvasWidget engine={engine} />;
};
