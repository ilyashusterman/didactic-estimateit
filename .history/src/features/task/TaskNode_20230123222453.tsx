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

export const MyDiagram: React.FC<MyDiagramProps> = ({ tasks, links }) => {

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
    )

}

