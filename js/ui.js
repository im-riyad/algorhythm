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

    taskItem.dataset.priority = task.priority;

    taskItem.innerHTML = `
        <div class="task-info">

            <h4>${task.title}</h4>

            <span class="priority ${task.priority}">
                ${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
            </span>

        </div>

        <div class="task-actions">

            <button
                class="task-action complete-task"
                title="Complete task"
            >
                <i data-lucide="circle-check"></i>
            </button>

            <button
                class="task-action delete-task"
                title="Delete task"
            >
                <i data-lucide="trash-2"></i>
            </button>

        </div>
    `;

    taskList.appendChild(taskItem);

    lucide.createIcons();
}

taskList.addEventListener("click", (event) => {

    const completeButton = event.target.closest(".complete-task");
    const deleteButton = event.target.closest(".delete-task");

    const taskItem = event.target.closest(".task-item");

    if (!taskItem) {
        return;
    }

    if (completeButton) {

        taskItem.classList.toggle("completed");

        const priority = taskItem.querySelector(".priority");

        if (taskItem.classList.contains("completed")) {

            priority.textContent = "Completed";

            priority.className = "priority completed";

        } else {

            const originalPriority = taskItem.dataset.priority;

            priority.textContent =
                originalPriority.charAt(0).toUpperCase()
                + originalPriority.slice(1)
                + " Priority";

            priority.className =
                `priority ${originalPriority}`;

        }

    }

    if (deleteButton) {

        taskItem.remove();

        if (taskList.children.length === 0) {

            taskList.innerHTML = `
                <div class="task-empty">

                    <i data-lucide="clipboard-list"></i>

                    <p>No tasks added yet.</p>

                </div>
            `;

            lucide.createIcons();

        }

    }

});