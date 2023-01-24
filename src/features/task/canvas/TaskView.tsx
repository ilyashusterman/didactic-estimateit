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

  const getNodes = (
    tasks: any[]
  ): Node<{ title: any; subline: any; id: any; data: any }>[] => {
    let nodes: any[] = [];

    const traverseTasks = (task: any, x: number, y: number) => {
      nodes.push({
        id: task.name,
        position: { x, y },
        data: { title: task.name, subline: task.description },
        type: "turbo",
      });

      task.nextTasks.forEach((nextTaskId: any, index: number) => {
        const nextTask = systemTasks.find((t) => t.name === nextTaskId);
        if (nextTask) {
          traverseTasks(nextTask, x + 1, y + (index + 1) * marginPadding);
        }
      });
    };

    tasks.forEach((task, index) => {
      traverseTasks(task, index * marginPadding, 50);
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
