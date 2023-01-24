import { CanvasWidget } from "@projectstorm/react-canvas-core";
import {
  DiagramEngine,
  DiagramModel,
  DefaultNodeModel,
  PortModel,
  PortModelAlignment,
  DefaultPortModel,
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
    this.addPort(new DefaultPortModel(true, "in"));
    this.addPort(new DefaultPortModel(false, "out"));
    // this.addPort(new PortModel({ in: false, alignment: "bottom" }));
  }
}

interface MyDiagramProps {
  tasks: TaskNodeProps[];
}

export const TaskDiagram: React.FC<MyDiagramProps> = ({ tasks = [] }) => {
  const engine = new DiagramEngine();
  const model = new DiagramModel();

  // create task nodes
  const taskNodes =
    tasks.map(
      (task) => new DefaultNodeModel({ ...task, color: "rgb(0,192,255)" })
    ) || [];

  // add the tasks to the model
  taskNodes.forEach((taskNode) => model.addNode(taskNode));

  // Create links between the tasks
  for (let i = 0; i < taskNodes.length - 1; i++) {
    const portOut = taskNodes[i].getPort("out");
    const portInt = taskNodes[i + 1].getPort("in");
    const link = portOut.link(portInt);
    // const link = port1.link<DefaultLinkModel>(port2);
    model.addLink(link);
  }

  engine.setModel(model);

  return <CanvasWidget engine={engine} />;
};
