import { CanvasWidget } from "@projectstorm/react-canvas-core";
import {
  DiagramEngine,
  DiagramModel,
  DefaultNodeModel,
  PortModel,
} from "@projectstorm/react-diagrams";

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

    // create in and out ports
    this.addPort(new PortModel({ in: true, name: "in" }));
    this.addPort(new PortModel({ in: false, name: "out" }));
  }
}

interface MyDiagramProps {
  tasks: TaskNodeProps[];
}

const MyDiagram: React.FC<MyDiagramProps> = ({ tasks = [] }) => {
  const engine = new DiagramEngine();
  const model = new DiagramModel();

  // create task nodes
  const taskNodes = tasks.map((task) => new TaskNodeModel(task));

  // add the tasks to the model
  taskNodes.forEach((taskNode) => model.addNode(taskNode));

  // Create links between the tasks
  for (let i = 0; i < taskNodes.length - 1; i++) {
    const link = taskNodes[i]
      .getPort("out")
      .link(taskNodes[i + 1].getPort("in"));
    model.addLink(link);
  }

  engine.setModel(model);

  return <CanvasWidget engine={engine} />;
};
