export function addTask(tasks, title) {
    const newTask = {
        id: Date.now(),
        title: title,
        status: "todo"
    };
    return [...tasks, newTask];
}
export function advanceTask(tasks, id) {
    return tasks.map(task => {
        if (task.id !== id) {
            return task;
        }
        let nextStatus;
        if (task.status === "todo") {
            nextStatus = "in-progress";
        }
        else {
            nextStatus = "done";
        }
        return { ...task, status: nextStatus };
    });
}
export function deleteTask(tasks, id) {
    return tasks.filter(task => task.id !== id);
}
export function filterByStatus(tasks, status) {
    if (status === "all") {
        return tasks;
    }
    return tasks.filter(task => task.status === status);
}
