import React, { useCallback } from "react";
import ReactFlow, {
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  Node,
  Edge,
} from "reactflow";
import { FiFile } from "react-icons/fi";

import "reactflow/dist/base.css";
import "./index.css";
import TurboNode, { TurboNodeData } from "./TurboNode";
import TurboEdge from "./TurboEdge";
import FunctionIcon from "./FunctionIcon";

const nodeTypes = {
  turbo: TurboNode,
};

const edgeTypes = {
  turbo: TurboEdge,
};

const defaultEdgeOptions = {
  type: "turbo",
  markerEnd: "edge-circle",
};

interface Task {
  name: string;
  cost: number;
  estimate: number;
  description: string;
}

interface TaskCanvasProps {
  tasks: Task[];
}

const TaskCanvas: React.FC<TaskCanvasProps> = ({ tasks }) => {
  let links = [];
  let nodes = tasks.map((task, i) => {
    const node: any = {
      id: task.name,
      task: task,
      position: { x: i * 200, y: 0 },
      data: {
        icon: <FunctionIcon />,
        title: task.name,
        subline: task.description,
      },
      type: "turbo",
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
  const [nodesState, setNodes, onNodesChange] = useNodesState(nodes);
  const [edgesState, setEdges, onEdgesChange] = useEdgesState(links);

  const onConnect = useCallback(
    (params: any) => setEdges((els) => addEdge(params, els)),
    []
  );

  return (
    <ReactFlow
      nodes={nodesState}
      edges={edgesState}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      defaultEdgeOptions={defaultEdgeOptions}
    >
      <Controls showInteractive={false} />
      <svg>
        <defs>
          <linearGradient id="edge-gradient">
            <stop offset="0%" stopColor="#ae53ba" />
            <stop offset="100%" stopColor="#2a8af6" />
          </linearGradient>

          <marker
            id="edge-circle"
            viewBox="0 0 20 20"
            refX="10"
            refY="10"
            markerWidth="10"
            markerHeight="10"
            orient="auto"
          >
            <circle cx="10" cy="10" r="7" fill="url(#edge-gradient)" />
          </marker>
        </defs>
      </svg>
    </ReactFlow>
  );
};

export default TaskCanvas;
