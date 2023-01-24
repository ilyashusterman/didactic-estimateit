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
import { useAppSelector } from "../../../app/hooks";
import { selectTasks } from "../taskSlice";

type Task = {
  id: string;
  name: string;
  description: string;
  cost: number;
  estimate: number;
  nextTasks: string[];
};

interface Props {
  tasks: Task[];
}

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

const TaskCanvas = (props: Props) => {
  const tasks = useAppSelector(selectTasks);
  const [nodes, setNodes, onNodesChange] = useNodesState(
    tasks.map((task, index) => ({
      id: task.id,
      position: { x: index * 250, y: 0 },
      data: { title: task.name, subline: task.description },
      type: "turbo",
    }))
  );

  const [edges, setEdges, onEdgesChange] = useEdgesState(
    tasks
      .map((task) =>
        task.nextTasks.map((nextTaskId: any) => ({
          id: `${task.id}-${nextTaskId}`,
          source: task.id,
          target: nextTaskId,
        }))
      )
      .flat()
  );
  const onConnect = useCallback(
    (params: any) => setEdges((els) => addEdge(params, els)),
    []
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
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
            viewBox="-5 -5 10 10"
            refX="0"
            refY="0"
            markerUnits="strokeWidth"
            markerWidth="10"
            markerHeight="10"
            orient="auto"
          >
            <circle stroke="#2a8af6" strokeOpacity="0.75" r="2" cx="0" cy="0" />
          </marker>
        </defs>
      </svg>
    </ReactFlow>
  );
};

export default TaskCanvas;
