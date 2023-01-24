import React, { useEffect } from "react";
import ReactFlow, {
  Controls,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  useReactFlow,
  ReactFlowProvider,
} from "reactflow";

import "reactflow/dist/base.css";
import "./index.css";
import TurboNode from "./TurboNode";
import TurboEdge from "./TurboEdge";
import { useAppSelector } from "../../../app/hooks";
import { selectSystemTasks, selectTasks } from "../taskSlice";

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

interface TaskCanvasView {
  marginPadding: number;
}
const TaskCanvasView = ({ marginPadding = 250, ...props }: TaskCanvasView) => {
  const selectedTasks = useAppSelector(selectTasks);
  const systemTasks = useAppSelector(selectSystemTasks);

  // Helper function to get nodes from tasks
  const getNodes = (
    tasksTo: any[]
  ): Node<{ title: any; subline: any; id: any }>[] => {
    // Initialize nodes array
    let nodes: Node<{ title: any; subline: any; id: any }>[] = [];
    // Iterate over tasks
    tasksTo.map((task, index) => {
      // Add task as node
      nodes.push({
        id: task.name,
        position: { x: index * 1.2 * marginPadding, y: 50 },
        data: { title: task.name, subline: task.description, id: index },
        type: "turbo",
      });
      // Iterate over nextTasks
      //   for (let nextTaskId of task.nextTasks) {
      task.nextTasks.map((nextTaskId: any, nextTaskIndex: number) => {
        //   for (let nextTaskId of task.nextTasks) {
        // Check if nextTask exists in systemTasks
        const nextTask = systemTasks.find((t) => t.name === nextTaskId);
        if (nextTask) {
          // Add nextTask as node
          nodes.push({
            id: nextTask.name,
            position: {
              x: index * marginPadding,
              y: (nextTaskIndex + 1) * marginPadding,
            },
            data: {
              title: nextTask.name,
              subline: nextTask.description,
              id: index,
            },
            type: "turbo",
          });
        }
      });
    });
    return nodes;
  };

  // Helper function to get edges from tasks
  const getEdges = (tasksTo: any[]): Edge<any>[] => {
    return tasksTo
      .map((task) =>
        task.nextTasks.map((nextTaskId: any) => ({
          id: `${task.id}-${nextTaskId}`,
          source: task.name,
          target: nextTaskId,
        }))
      )
      .flat();
  };
  const reactFlowInstance = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    setNodes(getNodes(selectedTasks));
    setEdges(getEdges(selectedTasks));
  }, [selectedTasks]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      defaultEdgeOptions={defaultEdgeOptions}
    >
      <Controls showInteractive={false} />
      <svg>
        <defs>
          <linearGradient id="edge-gradient">
            <stop offset="0%" stopColor="#48F043" />
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
            <circle stroke="#48F043" strokeOpacity="0.75" r="2" cx="0" cy="0" />
          </marker>
        </defs>
      </svg>
    </ReactFlow>
  );
};

export const TaskCanvas = (props: any) => {
  return (
    <ReactFlowProvider>
      <TaskCanvasView {...props} />
    </ReactFlowProvider>
  );
};
export default TaskCanvas;
