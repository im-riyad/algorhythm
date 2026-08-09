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
        id: Date.now(),
        title: document.getElementById("task-title").value.trim(),
        subject: document.getElementById("task-subject").value,
        priority: document.getElementById("task-priority").value,
        date: document.getElementById("task-date").value,
        time: document.getElementById("task-time").value,
        description: document.getElementById("task-description").value.trim()
    };

    console.log("New Task:", task);

    tasks.push(task);

    saveTasks(tasks);
    updateDashboardStats();

    renderTask(task);

    updateDashboardStats();

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

    taskItem.dataset.id = task.id;
    taskItem.dataset.priority = task.priority;

    if (task.completed) {
    taskItem.classList.add("completed");
    }

    taskItem.innerHTML = `
        <div class="task-info">

            <h4>${task.title}</h4>

            <span class="priority ${task.completed ? "completed" : task.priority}">
                ${
                    task.completed
                        ? "Completed"
                        : task.priority.charAt(0).toUpperCase()
                            + task.priority.slice(1)
                            + " Priority"
                }
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

function updateDashboardStats() {

    const totalTasks = tasks.length;

    const dueToday = tasks.filter(task => {
        return task.date === new Date().toISOString().split("T")[0]
            && !task.completed;
    }).length;

    const completedTasks = tasks.filter(
        task => task.completed
    ).length;

    const completedPercentage = totalTasks === 0
        ? 0
        : Math.round((completedTasks / totalTasks) * 100);

    const uniqueSubjects = new Set(
        tasks.map(task => task.subject)
    );

    const totalSubjects = uniqueSubjects.size;

    document.getElementById("total-tasks").textContent =
        totalTasks;

    document.getElementById("due-today").textContent =
        dueToday;

    document.getElementById("completed-percentage").textContent =
        `${completedPercentage}%`;

    document.getElementById("total-subjects").textContent =
        totalSubjects;
}

taskList.addEventListener("click", (event) => {

    const completeButton = event.target.closest(".complete-task");
    const deleteButton = event.target.closest(".delete-task");

    const taskItem = event.target.closest(".task-item");

    if (!taskItem) {
        return;
    }

    if (completeButton) {

        const taskId = Number(taskItem.dataset.id);
        const task = tasks.find(task => task.id === taskId);
        task.completed = !task.completed;

        saveTasks(tasks);

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

    const taskId = Number(taskItem.dataset.id);

    tasks = tasks.filter(task => task.id !== taskId);

    saveTasks(tasks);
    updateDashboardStats();

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

function renderAllTasks() {

    taskList.innerHTML = "";

    if (tasks.length === 0) {

        taskList.innerHTML = `
            <div class="task-empty">

                <i data-lucide="clipboard-list"></i>

                <p>No tasks added yet.</p>

            </div>
        `;

        lucide.createIcons();

        return;
    }

    tasks.forEach(task => {
        renderTask(task);
    });
}

renderAllTasks();
updateDashboardStats();