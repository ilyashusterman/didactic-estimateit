import React, { useCallback, useEffect } from "react";
import ReactFlow, {
  Controls,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  useReactFlow,
  ReactFlowProvider,
} from "reactflow";
import { FiFile } from "react-icons/fi";

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

const TaskCanvasView = (props: any) => {
  const tasks = useAppSelector(selectTasks);
  const sysytemTasks = useAppSelector(selectSystemTasks);
  const sysytemTasksNames = sysytemTasks.map((t) => t.name);
  const getNodes = (tasksTo: any[]): Node<{ title: any; subline: any }>[] => {
    let nextTasks = [];
    return tasksTo.map((task, index) => {
      if (task.nextTasks) {
        task.nextTasks.map((name: any) => {
          const nextTask = sysytemTasks.find(
            (taskSys) => taskSys.name === name
          );
          nextTasks.push(nextTask);
        });
      }
      return {
        id: task.name,
        position: { x: index * 250, y: 0 },
        data: { title: task.name, subline: task.description, id: index },
        type: "turbo",
      };
    });
  };
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
    setNodes(getNodes(tasks));
    setEdges(getEdges(tasks));
  }, [tasks]);

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
