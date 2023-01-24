import Diagram, { createSchema, useSchema } from "beautiful-react-diagrams";
import { Button } from "beautiful-react-ui";

interface TaskNodeProps {
  id: string;
  x: number;
  y: number;
  task: string;
  description: string;
  name: string;
  cost: number;
  time: number;
}

const TaskNode: React.FC<TaskNodeProps> = ({
  id,
  x,
  y,
  task,
  description,
  name,
  cost,
  time,
}) => (
  <Node id={id} x={x} y={y}>
    <div>
      <div>Task: {task}</div>
      <div>Description: {description}</div>
      <div>Name: {name}</div>
      <div>Cost: {cost}</div>
      <div>Time: {time}</div>
    </div>
  </Node>
);

interface MyDiagramProps {
  tasks: {
    id: string;
    task: string;
    description: string;
    name: string;
    cost: number;
    time: number;
  }[];
  links: { from: string; to: string }[];
}

const initialSchema = createSchema({
  nodes: [
    {
      id: "node-1",
      content: "Node 1",
      coordinates: [150, 60],
      outputs: [{ id: "port-1", alignment: "right" }],
    },
  ],
});

export const MyDiagram: React.FC<MyDiagramProps> = ({ tasks, links }) => {
  const [schema, { onChange, addNode, removeNode }] = useSchema(initialSchema);

  const deleteNodeFromSchema = (id: any) => {
    const nodeToRemove = schema.nodes.find((node) => node.id === id);
    if (nodeToRemove) {
      removeNode(nodeToRemove);
    }
  };

  const addNewNode = () => {
    const nextNode = {
      id: `node-${schema.nodes.length + 1}`,
      content: `Node ${schema.nodes.length + 1}`,
      coordinates: [
        schema.nodes[schema.nodes.length - 1].coordinates[0] + 100,
        schema.nodes[schema.nodes.length - 1].coordinates[1],
      ],
      render: CustomRender,
      data: { onClick: deleteNodeFromSchema },
      inputs: [{ id: `port-${Math.random()}` }],
      outputs: [{ id: `port-${Math.random()}` }],
    };

    addNode(nextNode);
  };
  return (
    <Diagram>
      {tasks.map(({ id, task, description, name, cost, time }) => (
        <TaskNode
          id={id}
          x={100}
          y={100}
          task={task}
          description={description}
          name={name}
          cost={cost}
          time={time}
        />
      ))}
      {links.map(({ from, to }) => (
        <Link from={from} to={to} />
      ))}
    </Diagram>
  );
};
