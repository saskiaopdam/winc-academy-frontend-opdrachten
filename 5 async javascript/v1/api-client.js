const button = document.getElementsByTagName("button")[0];
const par = document.getElementsByTagName("p")[0];
const list = document.getElementsByTagName("ul")[0];

const removeTaskFromList = (e) => {
  e.target.parentNode.remove();
};

const removeTaskFromDatabase = (taskId) => {
  fetch(`http://localhost:3000/${taskId}`, {
    method: "DELETE",
  });
};

const removeTask = (e) => {
  const taskId = e.target.parentNode.getAttribute("id");
  console.log(taskId);
  // 1 remove task from list on page
  // 2 remove task from database
  removeTaskFromList(e);
  removeTaskFromDatabase(taskId);
};

const addTaskToList = (task) => {
  if (task == "") {
    par.textContent = "Please enter a new task";
  } else {
    par.textContent = "";
    const newLi = document.createElement("li");
    const prullenbak = document.createElement("i");
    list.appendChild(newLi);
    newLi.textContent = task;
    newLi.appendChild(prullenbak);
    prullenbak.setAttribute("class", "far fa-trash-alt");
    prullenbak.addEventListener("click", removeTask);
  }
};

const addTaskToDatabase = (task) => {
  const data = { description: task, done: false };
  fetch("http://localhost:3000/", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const storeTaskId = () => {
  fetch("http://localhost:3000/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const taskId = data[data.length - 1]._id;
      console.log(taskId);
      list.lastElementChild.setAttribute("id", taskId);
    });
};

const addTask = () => {
  const task = document.getElementsByTagName("input")[0].value;
  console.log(task);
  // 1 add task to list on page
  // 2 add task to database
  // 3 store task id for future use (deleting task)
  addTaskToList(task);
  addTaskToDatabase(task);
  storeTaskId();
};

button.addEventListener("click", addTask);
