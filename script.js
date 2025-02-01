document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  function addTask() {
    let taskText = taskInput.value.trim();
    if (taskText === "") {
      alert("Please input some text!");
      return;
    }

    let newLi = document.createElement("li");
    newLi.textContent = taskText;

    let newBttn = document.createElement("button");
    newBttn.textContent = "Remove";
    newBttn.classList.add("remove-btn");

    newBttn.onclick = function () {
      newLi.remove();
    };
    newLi.appendChild(newBttn);
    taskList.appendChild(newLi);

    taskInput.value = "";
  }

  addButton.addEventListener("click", addTask);
  taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });
});

function loadTasks() {
  const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  storedTasks.forEach((taskText) => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
}

function addTask(taskText, save = true) {
  const taskItem = document.createElement("li");
  taskItem.textContent = taskText;

  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.addEventListener("click", () => {
    removeTask(taskText);
    taskItem.remove();
  });

  taskItem.appendChild(removeButton);
  document.getElementById("taskList").appendChild(taskItem);

  if (save) {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    storedTasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(storedTasks));
  }
}

function removeTask(taskText) {
  let storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  storedTasks = storedTasks.filter((task) => task !== taskText);
  localStorage.setItem("tasks", JSON.stringify(storedTasks));
}
