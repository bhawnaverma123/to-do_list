document.addEventListener("DOMContentLoaded", loadTasks);

// Function to load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskBody = document.getElementById('taskBody');
    taskBody.innerHTML = ''; // Clear the table before populating
    tasks.forEach((task, index) => createTaskRow(task, index));
}

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const task = taskInput.value.trim();
    if (task === "") {
        alert("Please enter a task.");
        return;
    }

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    createTaskRow(task, tasks.length - 1);
    taskInput.value = ''; // Clear the input field
}

// Function to create a row in the table
function createTaskRow(task, index) {
    const taskBody = document.getElementById('taskBody');
    const row = document.createElement('tr');

    const taskCell = document.createElement('td');
    taskCell.textContent = task;
    row.appendChild(taskCell);

    const actionsCell = document.createElement('td');

    // Edit button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => editTask(index);
    actionsCell.appendChild(editBtn);

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => deleteTask(index);
    actionsCell.appendChild(deleteBtn);

    row.appendChild(actionsCell);
    taskBody.appendChild(row);
}

// Function to delete a task
function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.splice(index, 1); // Remove the task at the given index
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks(); // Refresh the task list
}

// Function to edit a task
function editTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const newTask = prompt("Edit task:", tasks[index]);
    if (newTask !== null && newTask.trim() !== "") {
        tasks[index] = newTask.trim();
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks(); // Refresh the task list
    }
}
