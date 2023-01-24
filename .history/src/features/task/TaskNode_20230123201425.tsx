import { CanvasWidget } from "@projectstorm/react-canvas-core";
import createEngine, {
  DiagramEngine,
  DiagramModel,
  DefaultNodeModel,
  PortModel,
  PortModelAlignment,
  DefaultPortModel,
  DefaultLinkModel,
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
  const engine = createEngine();
  const model = new DiagramModel();

  // create task nodes
  //   const taskNodes = tasks.map((task) => new TaskNodeModel(task)) || [];

  //   // add the tasks to the model
  //   taskNodes.forEach((taskNode) => model.addNode(taskNode));

  //   // Create links between the tasks
  //   for (let i = 0; i < taskNodes.length - 1; i++) {
  //     const link = taskNodes[i]
  //       .getPort("out")?.(taskNodes[i + 1].getPort("in"));
  //     model.addLink(link);
  //   }
  // node 1
  const node1 = new DefaultNodeModel({
    name: "Node 1",
    color: "rgb(0,192,255)",
  });
  node1.setPosition(100, 100);
  let port1 = node1.addOutPort("Out");

  // node 2
  const node2 = new DefaultNodeModel({
    name: "Node 1",
    color: "rgb(0,192,255)",
  });
  node2.setPosition(100, 100);
  let port2 = node2.addOutPort("Out");
  const link = port1.link<DefaultLinkModel>(port2);
  link.addLabel("Hello World!");
  model.addAll(node1, node2, link);
  engine.setModel(model);

  return <CanvasWidget engine={engine} />;
};
