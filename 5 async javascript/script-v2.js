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
    console.log(typeof taskList);
    // if (taskList !== 200 && typeof taskList === "number")
    if (taskList !== 200 && !isNaN(taskList) && taskList.length !== 0) {
      messageArea.innerText =
        "Database Request: \n Getting task list from database failed";
    } // zonder de 3e conditie verschijnt een foutmelding als de db leeg is
    if (taskList instanceof Error) {
      messageArea.innerText =
        "Database Request: \n Getting task list from database failed to be executed";
      // "Database Request: \n Executing your request to database failed";
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
      checkbox.nextElementSibling.classList.add("lineThrough");
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
      // if (task !== 200 && typeof task === "number")
      if (task !== 200 && !isNaN(task)) {
        messageArea.innerText =
          "Database Request: \n Adding task to database failed";
      }
      if (task instanceof Error) {
        messageArea.innerText =
          "Database Request: \n Adding task to database failed to be executed";
        // "Database Request: \n Executing your request to database failed";
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

// veel overlap tussen 3 functies, hoe inkorten?
// 1 changeStatusToDone
// 2 changeStatusToNotDone
// 3 editTask
const changeStatusToDone = async (e) => {
  // e.target is checkbox
  const taskId = e.target.parentElement.getAttribute("id");
  console.log(taskId);
  try {
    const task = await changeStatusToDoneInDB(taskId);
    console.log(task);
    // if (task !== 200 && typeof task === "number")
    if (task !== 200 && !isNaN(task)) {
      messageArea.innerText =
        "Database Request: \n Changing task status in database failed";
    }
    if (task instanceof Error) {
      messageArea.innerText =
        "Database Request: \n Changing task status in database failed to be executed";
      // "Database Request: \n Executing your request to database failed";
    } else {
      const changeStatusToDoneInUI = (e) => {
        e.target.setAttribute("checked", true);
        e.target.nextElementSibling.classList.add("lineThrough");
      };
      changeStatusToDoneInUI(e);
    }
  } catch (error) {
    console.log(error);
  }
};
const changeStatusToNotDone = async (e) => {
  // e.target is checkbox
  const taskId = e.target.parentElement.getAttribute("id");
  console.log(taskId);
  try {
    const task = await changeStatusToNotDoneInDB(taskId);
    console.log(task);
    // if (task !== 200 && typeof task === "number")
    if (task !== 200 && !isNaN(task)) {
      messageArea.innerText =
        "Database Request: \n Changing task status in database failed";
    }
    if (task instanceof Error) {
      messageArea.innerText =
        "Database Request: \n Changing task status in database failed to be executed";
      // "Database Request: \n Executing your request to database failed";
    } else {
      const changeStatusToNotDoneInUI = (e) => {
        e.target.setAttribute("checked", false);
        e.target.nextElementSibling.classList.remove("lineThrough");
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
  const fieldToEditTask = e.target.parentElement.nextElementSibling;
  console.log(fieldToEditTask);
  fieldToEditTask.classList.remove("hidden");
  const buttonToEditTask = fieldToEditTask.nextElementSibling;
  console.log(buttonToEditTask);
  buttonToEditTask.classList.remove("hidden");
};

const editTask = async (e) => {
  // e.target is buttonToEditTask
  console.log("edited task saved");
  const li = e.target.previousElementSibling.previousElementSibling;
  console.log(li);
  const taskId = li.getAttribute("id");
  console.log(taskId);
  const buttonToEditTask = e.target;
  console.log(buttonToEditTask);
  const fieldToEditTask = e.target.previousElementSibling;
  console.log(fieldToEditTask);
  const editedTask = fieldToEditTask.value;
  console.log(editedTask);
  try {
    const task = await editTaskInDB(taskId, editedTask);
    console.log(task);
    // if (task !== 200 && typeof task === "number")
    if (task !== 200 && !isNaN(task)) {
      messageArea.innerText =
        "Database Request: \n Editing task in database failed";
    }
    if (task instanceof Error) {
      messageArea.innerText =
        "Database Request: \n Editing task in database failed to be executed";
      // "Database Request: \n Executing your request to database failed";
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
  const taskId = e.target.parentElement.getAttribute("id");
  console.log(taskId);
  try {
    const taskIsRemoved = await removeTaskFromDB(taskId);
    console.log(taskIsRemoved);
    // if (taskIsRemoved !== 200 && typeof taskIsRemoved === "number")
    if (taskIsRemoved !== 200 && !isNaN(taskIsRemoved)) {
      messageArea.innerText =
        "Database Request: \n Removing task from database failed";
    }
    if (taskIsRemoved instanceof Error) {
      messageArea.innerText =
        "Database Request: \n Removing task from database failed to be executed";
      // "Database Request: \n Executing your request to database failed";
    } else {
      const removeTaskFromUI = (e) => {
        e.target.parentElement.remove();
      };
      removeTaskFromUI(e);
    }
  } catch (error) {
    console.log(error);
  }
};
