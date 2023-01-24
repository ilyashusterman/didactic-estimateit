import Diagram, { createSchema, useSchema } from "beautiful-react-diagrams";

const TaskNode = (props) => {
  const { task } = props;
  return (
    <div style={{ background: "#717EC3", borderRadius: "10px" }}>
      <div style={{ padding: "10px", color: "white" }}>
        <div>Task: {task.task}</div>
        <div>Description: {task.description}</div>
        <div>Name: {task.name}</div>
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

interface UncontrolledDiagram {
  tasks: any[];
}
const UncontrolledDiagram = ({ tasks }: UncontrolledDiagram) => {
  let links: any[] = [];
  let nodes = tasks.map((task, i) => {
    const node = {
      id: task.task,
      task: task,
      coordinates: [150 + i * 100, 60],
      render: TaskNode,
    };
    if (i !== tasks.length - 1) {
      links.push({ from: task.task, to: tasks[i + 1].task });
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
