export interface Task {
    name: string;
    description: string;
    cost: number;
    time: number;
    nextTasks: string[];
}

export interface TaskProps {
    tasks: Task[];
}