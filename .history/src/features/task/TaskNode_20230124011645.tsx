import Diagram, { createSchema, useSchema } from "beautiful-react-diagrams";

import React from "react";

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
interface CustomRenderI {
  id: any;
  content: any;
  data: any;
  inputs: any[];
  outputs: any[];
}
const CustomRender = ({
  id,
  content,
  data,
  inputs,
  outputs,
}: CustomRenderI) => (
  <div style={{ background: "purple" }}>
    <div style={{ textAlign: "right" }}>
      <button onClick={() => data.onClick(id)} />
    </div>
    <div role="button" style={{ padding: "15px" }}>
      {content}
    </div>
    <div
      style={{
        marginTop: "10px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {inputs.map((port: any) =>
        React.cloneElement(port, {
          style: { width: "25px", height: "25px", background: "#1B263B" },
        })
      )}
      {outputs.map((port: any) =>
        React.cloneElement(port, {
          style: { width: "25px", height: "25px", background: "#1B263B" },
        })
      )}
    </div>
  </div>
);

export const UncontrolledDiagram = (props: any) => {
  // create diagrams schema
  const [schema, { onChange, addNode, removeNode }] = useSchema(initialSchema);

  const addNewNode = () => {
    const nextNode: any = {
      id: `node-${schema.nodes.length + 1}`,
      content: `Node ${schema.nodes.length + 1}`,
      coordinates: [
        schema.nodes[schema.nodes.length - 1].coordinates[0] + 100,
        schema.nodes[schema.nodes.length - 1].coordinates[1],
      ],
      render: CustomRender,
      //    data: {onClick: deleteNodeFromSchema},
      task: { "1": "test" },
      inputs: [{ id: `port-${Math.random()}` }],
      outputs: [{ id: `port-${Math.random()}` }],
    };

    addNode(nextNode);
  };

  return (
    <div style={{ height: "22.5rem" }}>
      <button color="primary" onClick={addNewNode}>
        Add new node
      </button>
      <Diagram schema={schema} onChange={onChange} />
    </div>
  );
};
