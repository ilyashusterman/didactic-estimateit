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

const engine = new DiagramEngine();
const model = new DiagramModel();

const task1 = new TaskNodeModel({
  id: "1",
  task: "Task 1",
  description: "This is the description of Task 1",
  name: "Task 1 name",
  cost: 100,
  time: 10,
});

model.addNode(task1);
engine.setModel(model);

// Render the Diagram using the DiagramEngine

const TaskDiagram: React.FC = ({ tasks }: any) => {
  const engine = new DiagramEngine();
  const model = new DiagramModel();

  const task1 = new TaskNodeModel({
    id: "1",
    task: "Task 1",
    description: "This is the description of Task 1",
    name: "Task 1 name",
    cost: 100,
    time: 10,
  });

  model.addNode(task1);
  engine.setModel(model);
  return <CanvasWidget engine={engine} />;
};
