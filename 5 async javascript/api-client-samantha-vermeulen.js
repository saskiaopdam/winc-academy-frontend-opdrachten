// NOTE instead of 'tagname use example getElementById
const button = document.getElementsByTagName("button")[0];
const par = document.getElementsByTagName("p")[0];
const list = document.getElementsByTagName("ul")[0];

const removeTaskFromList = (e) => {
  e.target.parentNode.remove();
};

const removeTaskFromDatabase = (taskId) => {
  // NOTE netjes template string
  fetch(`http://localhost:3000/${taskId}`, {
    method: "DELETE",
  });
};
// NOTE what happend when you removing in the database goes wrong?
const removeTask = (e) => {
  const taskId = e.target.parentNode.getAttribute("id");
  console.log(taskId);
  // 1 remove task from list on page
  // 2 remove task from database
  removeTaskFromList(e);
  removeTaskFromDatabase(taskId);
};

const addTaskToList = (task) => {
  // STEP 3: Give list get the description and the id 
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
// FIXME catch ERROR
const addTaskToDatabase = (task) => {
  const data = { description: task, done: false };
  fetch("http://localhost:3000/", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
  // STEP 4: POST the data and then add it with the addTaskToList()
};
// NOTE ASYNC/AWAIT
// FIXME GET shouldnt store the ID it should get the item(s) and show it to the website.
const storeTaskId = () => {
  fetch("http://localhost:3000/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // STEP 1: 
      // foreach in de data
      // STEP 2: give data to the addTaskToList
      const taskId = data[data.length - 1]._id;
      console.log(data);
      console.log(taskId);
      // FIXME this should be done with the POST not with the GET
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
storeTaskId()
button.addEventListener("click", addTask);
