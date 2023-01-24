import { Diagram, Node, Link } from "react-diagrams";

interface TaskNodeProps {
  id: string;
  x: number;
  y: number;
  task: string;
}

const TaskNode: React.FC<TaskNodeProps> = ({ id, x, y, task }) => (
  <Node id={id} x={x} y={y}>
    <div>{task}</div>
  </Node>
);

interface MyDiagramProps {
  tasks: { id: string; task: string }[];
  links: { from: string; to: string }[];
}

const MyDiagram: React.FC<MyDiagramProps> = ({ tasks, links }) => (
  <Diagram>
    {tasks.map(({ id, task }) => (
      <TaskNode id={id} x={100} y={100} task={task} />
    ))}
    {links.map(({ from, to }) => (
      <Link from={from} to={to} />
    ))}
  </Diagram>
);
