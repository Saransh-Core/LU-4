import { addTask, advanceTask, deleteTask, filterByStatus } from "./model.js";
let tasks = [];
let currentFilter = "all";
const titleInput = document.getElementById("title");
const statusInput = document.getElementById("status");
const addBtn = document.getElementById("add");
const listEl = document.getElementById("list");
const chipsEl = document.getElementById("chips");
const emptyEl = document.getElementById("empty");
function render() {
    const visibleTasks = filterByStatus(tasks, currentFilter);
    listEl.replaceChildren();
    emptyEl.hidden = visibleTasks.length > 0;
    visibleTasks.forEach(task => {
        const li = document.createElement("li");
        li.className = "task";
        const title = document.createElement("span");
        title.className = "task-title";
        title.textContent = task.title;
        const badge = document.createElement("span");
        badge.className = `badge ${task.status}`;
        badge.textContent = task.status;
        const actions = document.createElement("div");
        actions.className = "task-actions";
        if (task.status !== "done") {
            const advanceBtn = document.createElement("button");
            advanceBtn.className = "advance";
            advanceBtn.textContent =
                task.status === "todo" ? "Start →" : "Complete ✓";
            advanceBtn.onclick = () => {
                tasks = advanceTask(tasks, task.id);
                render();
            };
            actions.appendChild(advanceBtn);
        }
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete";
        deleteBtn.textContent = "✕";
        deleteBtn.setAttribute("aria-label", `Delete ${task.title}`);
        deleteBtn.onclick = () => {
            tasks = deleteTask(tasks, task.id);
            render();
        };
        actions.appendChild(deleteBtn);
        li.append(title, badge, actions);
        listEl.appendChild(li);
    });
}
addBtn.onclick = () => {
    const title = titleInput.value.trim();
    if (!title) {
        titleInput.focus();
        return;
    }
    const selectedStatus = statusInput.value;
    tasks = addTask(tasks, title);
    const newTask = tasks[tasks.length - 1];
    if (selectedStatus !== "todo") {
        tasks = advanceTask(tasks, newTask.id);
        if (selectedStatus === "done") {
            tasks = advanceTask(tasks, newTask.id);
        }
    }
    titleInput.value = "";
    render();
};
titleInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        addBtn.click();
    }
});
chipsEl.addEventListener("click", event => {
    const target = event.target;
    const button = target.closest("button[data-status]");
    if (!button) {
        return;
    }
    currentFilter = button.dataset.status;
    chipsEl.querySelectorAll(".filter").forEach(chip => {
        chip.classList.remove("active");
    });
    button.classList.add("active");
    render();
});
render();
