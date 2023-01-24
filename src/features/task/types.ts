export interface Task {
    name: string;
    description: string;
    cost: string;
    time: string;
    nextTasks: string[];
}

export interface TaskProps {
    tasks: Task[];
}