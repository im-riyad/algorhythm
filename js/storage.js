const STORAGE_KEY = "algorhythm_tasks";

function getTasks() {

    const storedTasks = localStorage.getItem(STORAGE_KEY);

    if (!storedTasks) {
        return [];
    }

    return JSON.parse(storedTasks);
}

function saveTasks(tasks) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(tasks)
    );
}