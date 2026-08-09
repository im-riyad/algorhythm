const addTaskButton = document.getElementById("add-task-btn");
const taskModal = document.getElementById("task-modal");
const modalClose = document.getElementById("modal-close");
const modalCancel = document.getElementById("modal-cancel");

function openTaskModal() {
    taskModal.style.display = "flex";
}

function closeTaskModal() {
    taskModal.style.display = "none";
}

addTaskButton.addEventListener("click", openTaskModal);

modalClose.addEventListener("click", closeTaskModal);

modalCancel.addEventListener("click", closeTaskModal);

taskModal.addEventListener("click", (event) => {

    if (event.target === taskModal) {
        closeTaskModal();
    }

});

const taskForm = document.getElementById("task-form");

taskForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const task = {
        title: document.getElementById("task-title").value.trim(),
        subject: document.getElementById("task-subject").value,
        priority: document.getElementById("task-priority").value,
        date: document.getElementById("task-date").value,
        time: document.getElementById("task-time").value,
        description: document.getElementById("task-description").value.trim()
    };

    console.log("New Task:", task);

    renderTask(task);

    taskForm.reset();

    closeTaskModal();
});

const taskList = document.getElementById("task-list");

function renderTask(task) {

    const emptyState = taskList.querySelector(".task-empty");

    if (emptyState) {
        emptyState.remove();
    }

    const taskItem = document.createElement("div");

    taskItem.className = "task-item";

    taskItem.innerHTML = `
        <div>

            <h4>${task.title}</h4>

            <span class="priority ${task.priority}">
                ${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
            </span>

        </div>

        <i data-lucide="circle"></i>
    `;

    taskList.appendChild(taskItem);

    lucide.createIcons();
}