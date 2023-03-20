// Select the necessary DOM elements
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

// Add event listeners for form submission and page load
taskForm.addEventListener("submit", addTask);
document.addEventListener("DOMContentLoaded", loadTasksFromLocalStorage);

// Function to add a new task
function addTask(e) {
  e.preventDefault();

  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }

  const li = createTaskElement(taskText);
  taskList.appendChild(li);
  saveTaskToLocalStorage(taskText);

  taskInput.value = "";
}

// Function to create a new task element
function createTaskElement(taskText) {
  const li = document.createElement("li");
  li.textContent = taskText;

  // Create edit button and add click event listener
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.addEventListener("click", editTask);
  li.appendChild(editButton);

  // Create delete button and add click event listener
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", deleteTask);
  li.appendChild(deleteButton);

  return li;
}

// Function to edit an existing task
function editTask(e) {
  const li = e.target.parentElement;
  const updatedTaskText = prompt("Update the task:", li.firstChild.textContent);

  if (updatedTaskText === null || updatedTaskText.trim() === "") {
    return;
  }

  removeTaskFromLocalStorage(li.firstChild.textContent);
  li.firstChild.textContent = updatedTaskText.trim();
  saveTaskToLocalStorage(updatedTaskText.trim());
}

// Function to delete a task
function deleteTask(e) {
  if (confirm("Are you sure you want to delete this task?")) {
    const li = e.target.parentElement;
    removeTaskFromLocalStorage(li.firstChild.textContent);
    li.remove();
  }
}

// Function to save a task to local storage
function saveTaskToLocalStorage(taskText) {
  const tasks = getTasksFromLocalStorage();
  tasks.push(taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to remove a task from local storage
function removeTaskFromLocalStorage(taskText) {
  const tasks = getTasksFromLocalStorage();
  const taskIndex = tasks.indexOf(taskText);
  tasks.splice(taskIndex, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasksFromLocalStorage() {
  const tasks = getTasksFromLocalStorage();
  tasks.forEach(taskText => {
    const li = createTaskElement(taskText);
    taskList.appendChild(li);
  });
}

// Function to get tasks from local storage
function getTasksFromLocalStorage() {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
}
