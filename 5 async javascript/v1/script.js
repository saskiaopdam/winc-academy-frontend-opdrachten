// All UI stuff goes here

const fieldToAddTask = document.getElementById("fieldToAddTask");
const buttonToAddTask = document.getElementById("buttonToAddTask");
const messageArea = document.getElementById("messageArea");
const listArea = document.getElementById("listArea");

// load data

const loadTaskList = async () => {
  try {
    const taskList = await getTaskListFromDB();
    console.log(taskList);
    if (taskList instanceof Error) {
      messageArea.innerText =
        "Database Connection: \n The connection to database is failed";
    } else {
      const displayTaskList = (taskList) => {
        taskList.forEach((task) => {
          addTaskToUI(task);
        });
      };
      displayTaskList(taskList);
    }
  } catch (error) {
    console.log(error);
  }
};

loadTaskList();

// display data

const addTaskToUI = (task) => {
  const displayTask = () => {
    // create
    const newLi = document.createElement("li");
    const checkbox = document.createElement("input");
    const todo = document.createElement("span");
    const bin = document.createElement("i");
    // set attributes, properties & listeners
    newLi.setAttribute("id", task._id);
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("class", "checkbox");
    checkbox.addEventListener("change", changeTaskStatus);
    todo.setAttribute("class", "todo");
    todo.innerText = task.description;
    todo.addEventListener("click", displayEditArea);
    bin.setAttribute("class", "far fa-trash-alt bin");
    bin.addEventListener("click", removeTask);
    // append
    listArea.appendChild(newLi);
    newLi.appendChild(checkbox);
    newLi.appendChild(todo);
    newLi.appendChild(bin);
    // check if task in DB done = "false" or done = "true";
    console.log(task.done);
    if (task.done) {
      checkbox.setAttribute("checked", true);
      checkbox.nextSibling.classList.add("lineThrough");
    }
  };
  displayTask();
  const displayEditAreaHidden = () => {
    // create
    const fieldToEditTask = document.createElement("input");
    const buttonToEditTask = document.createElement("button");
    // set attributes, properties & listeners
    fieldToEditTask.setAttribute("type", "text");
    fieldToEditTask.setAttribute("class", "fieldToEditTask");
    fieldToEditTask.classList.add("hidden");
    fieldToEditTask.value = task.description;
    buttonToEditTask.setAttribute("class", "buttonToEditTask");
    buttonToEditTask.classList.add("hidden");
    buttonToEditTask.innerText = "Edit Task";
    buttonToEditTask.addEventListener("click", editTask);
    // append
    listArea.appendChild(fieldToEditTask);
    listArea.appendChild(buttonToEditTask);
  };
  displayEditAreaHidden();
};

// add data

const addTask = async () => {
  const newTask = fieldToAddTask.value;
  console.log(newTask);
  if (newTask == "") {
    messageArea.innerText = "Please enter a new task";
    // mooier als dit in inputveld komt, en die focus krijgt
  } else {
    messageArea.innerText = "";
    try {
      const task = await addTaskToDB(newTask);
      console.log(task);
      if (task instanceof Error) {
        messageArea.innerText =
          "Database Connection: \n The connection to database is failed";
        // als fetch mislukt, krijg je dan altijd net::ERR_CONNECTION_REFUSED?
        // de foutmelding is daarop gebaseerd ...
      } else {
        addTaskToUI(task);
      }
      const clearFieldToAddTask = () => {
        fieldToAddTask.value = "";
      };
      clearFieldToAddTask();
    } catch (error) {
      console.log(error);
    }
  }
};

buttonToAddTask.addEventListener("click", addTask);

// change data

// 1 change status done / not done

const changeTaskStatus = (e) => {
  // e.target is checkbox
  if (e.target.checked) {
    console.log("Checkbox is checked..");
    changeStatusToDone(e);
  } else {
    console.log("Checkbox is not checked..");
    changeStatusToNotDone(e);
  }
};
const changeStatusToDone = async (e) => {
  // e.target is checkbox
  const taskId = e.target.parentNode.getAttribute("id");
  console.log(taskId);
  try {
    const task = await changeStatusToDoneInDB(taskId);
    console.log(task);
    if (task instanceof Error) {
      messageArea.innerText =
        "Database Connection: \n The connection to database is failed";
      // als fetch mislukt, krijg je dan altijd net::ERR_CONNECTION_REFUSED?
      // de foutmelding is daarop gebaseerd ...
    } else {
      const changeStatusToDoneInUI = (e) => {
        e.target.setAttribute("checked", true);
        e.target.nextSibling.classList.add("lineThrough");
      };
      changeStatusToDoneInUI(e);
    }
  } catch (error) {
    console.log(error);
  }
};
const changeStatusToNotDone = async (e) => {
  // e.target is checkbox
  const taskId = e.target.parentNode.getAttribute("id");
  console.log(taskId);
  try {
    const task = await changeStatusToNotDoneInDB(taskId);
    console.log(task);
    if (task instanceof Error) {
      messageArea.innerText =
        "Database Connection: \n The connection to database is failed";
      // als fetch mislukt, krijg je dan altijd net::ERR_CONNECTION_REFUSED?
      // de foutmelding is daarop gebaseerd ...
    } else {
      const changeStatusToNotDoneInUI = (e) => {
        e.target.setAttribute("checked", false);
        e.target.nextSibling.classList.remove("lineThrough");
      };
      changeStatusToNotDoneInUI(e);
    }
  } catch (error) {
    console.log(error);
  }
};

// 2 edit

const displayEditArea = (e) => {
  // e.target is todo
  console.log("task edited");
  const fieldToEditTask = e.target.parentNode.nextSibling;
  console.log(fieldToEditTask);
  fieldToEditTask.classList.remove("hidden");
  const buttonToEditTask = fieldToEditTask.nextSibling;
  console.log(buttonToEditTask);
  buttonToEditTask.classList.remove("hidden");
};

const editTask = async (e) => {
  // e.target is buttonToEditTask
  console.log("edited task saved");
  const li = e.target.previousSibling.previousSibling;
  console.log(li);
  const taskId = li.getAttribute("id");
  console.log(taskId);
  const buttonToEditTask = e.target;
  console.log(buttonToEditTask);
  const fieldToEditTask = e.target.previousSibling;
  console.log(fieldToEditTask);
  const editedTask = fieldToEditTask.value;
  console.log(editedTask);
  try {
    const task = await editTaskInDB(taskId, editedTask);
    console.log(task);
    if (task instanceof Error) {
      messageArea.innerText =
        "Database Connection: \n The connection to database is failed";
      // als fetch mislukt, krijg je dan altijd net::ERR_CONNECTION_REFUSED?
      // de foutmelding is daarop gebaseerd ...
    } else {
      const editTaskInUI = (e) => {
        const todo = li.children[1];
        console.log(todo);
        todo.innerText = editedTask;
        fieldToEditTask.classList.add("hidden");
        buttonToEditTask.classList.add("hidden");
      };
      editTaskInUI(e);
    }
  } catch (error) {
    console.log(error);
  }
};

// delete data

const removeTask = async (e) => {
  // e.target is bin
  const taskId = e.target.parentNode.getAttribute("id");
  console.log(taskId);
  try {
    const taskIsRemoved = await removeTaskFromDB(taskId);
    console.log(taskIsRemoved);
    if (taskIsRemoved instanceof Error) {
      messageArea.innerText =
        "Database Connection: \n The connection to database is failed";
      // als fetch mislukt, krijg je dan altijd net::ERR_CONNECTION_REFUSED?
      // de foutmelding is daarop gebaseerd ...
    } else {
      const removeTaskFromUI = (e) => {
        e.target.parentNode.remove();
      };
      removeTaskFromUI(e);
    }
  } catch (error) {
    console.log(error);
  }
};
