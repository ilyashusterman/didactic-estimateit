import Diagram, { createSchema, useSchema } from "beautiful-react-diagrams";
import React from "react";

interface Task {
  description: string;
  name: string;
  cost: number;
  time: number;
}

interface TaskNodeProps {
  task: Task;
  inputs: JSX.Element[];
  outputs: JSX.Element[];
}

const TaskNode: React.FC<TaskNodeProps> = (props) => {
  debugger;
  const { task } = props;
  return (
    <div style={{ background: "#717EC3", borderRadius: "10px" }}>
      <div style={{ padding: "10px", color: "white" }}>
        <div>Name: {task.name}</div>
        <div>Description: {task.description}</div>
        <div>Cost: {task.cost}</div>
        <div>Time: {task.time}</div>
      </div>
      <div style={{ marginTop: "20px" }}>
        {props.inputs.map((port) =>
          React.cloneElement(port, {
            style: { width: "50px", height: "25px", background: "#1B263B" },
          })
        )}
        {props.outputs.map((port) =>
          React.cloneElement(port, {
            style: { width: "50px", height: "25px", background: "#1B263B" },
          })
        )}
      </div>
    </div>
  );
};

interface UncontrolledDiagramProps {
  tasks: Task[];
}

export const UncontrolledDiagram: React.FC<UncontrolledDiagramProps> = ({
  tasks,
}) => {
  let links: any[] = [];
  let nodes = tasks.map((task, i) => {
    debugger;
    const node: any = {
      id: task.name,
      task: task,
      coordinates: [150 + i * 100, 60],
      render: TaskNode,
    };
    if (i !== tasks.length - 1) {
      links.push({ from: task.name, to: tasks[i + 1].name });
      node.outputs = [{ id: `port-${i}`, alignment: "right" }];
    }
    if (i !== 0) {
      node.inputs = [{ id: `port-${i}`, alignment: "left" }];
    }
    return node;
  });
  const schema = createSchema({ nodes, links });
  const [schemaState, { onChange }] = useSchema(schema);
  return (
    <div style={{ height: "22.5rem" }}>
      <Diagram schema={schemaState} onChange={onChange} />
    </div>
  );
};
