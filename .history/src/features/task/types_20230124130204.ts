export interface Task {
    name: string;
    description: string;
    cost: number;
    time: number;
    nextTasks: string[];
}

export interface Props {
    tasks: Task[];
}