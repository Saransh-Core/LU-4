export type TaskStatus = "todo" | "in-progress" | "done";

export interface Task {
    id: number;
    title: string;
    status: TaskStatus;
}

export function addTask(tasks: Task[], title: string): Task[] {
    const newTask: Task = {
        id: Date.now(),
        title: title,
        status: "todo"
    };

    return [...tasks, newTask];
}

export function advanceTask(tasks: Task[], id: number): Task[] {
    return tasks.map(task => {
        if (task.id !== id) {
            return task;
        }

        let nextStatus: TaskStatus;

        if (task.status === "todo") {
            nextStatus = "in-progress";
        } else {
            nextStatus = "done";
        }

        return { ...task, status: nextStatus };
    });
}

export function deleteTask(tasks: Task[], id: number): Task[] {
    return tasks.filter(task => task.id !== id);
}

export function filterByStatus(
    tasks: Task[],
    status: "all" | TaskStatus
): Task[] {
    if (status === "all") {
        return tasks;
    }

    return tasks.filter(task => task.status === status);
}