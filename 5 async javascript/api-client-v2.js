// All api requests go here

// get request
const getTaskListFromDB = async () => {
  try {
    const response = await fetch("http://localhost:3000", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      console.log(!response.ok);
      console.log(response.status + " " + response.statusText);
      return response.status; // test: change headers
    }
    const processedResponse = await response.json();
    // .json() method: taking JSON as input and parsing it to produce a JavaScript object
    console.log(processedResponse);
    return processedResponse; // processedResponse is array, a JavaScript object
  } catch (error) {
    return error; // test: change url
  }
};

// post request
const addTaskToDB = async (newTask) => {
  const task = { description: newTask, done: false };
  try {
    const response = await fetch("http://localhost:3000/", {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      console.log(!response.ok);
      console.log(response.status + " " + response.statusText);
      return response.status; // test: change headers
    }
    const processedResponse = await response.json();
    console.log(processedResponse); // processedResponse is object, a JavaScript object
    return processedResponse;
  } catch (error) {
    return error; // test: change url, change method
  }
};

// put request

// veel overlap tussen de put functies (alleen de const verschilt)
// hoe inkorten?
const changeStatusToDoneInDB = async (taskId) => {
  const task = { done: true };
  try {
    const response = await fetch(`http://localhost:3000/${taskId}`, {
      method: "PUT",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      console.log(!response.ok);
      console.log(response.status + " " + response.statusText);
      return response.status; // test: change headers
    }
    const processedResponse = await response.json();
    console.log(processedResponse); // processedResponse is object, a JavaScript object
    return processedResponse;
  } catch (error) {
    return error; // test: change url, change method
  }
};
const changeStatusToNotDoneInDB = async (taskId) => {
  const task = { done: false };
  try {
    const response = await fetch(`http://localhost:3000/${taskId}`, {
      method: "PUT",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      console.log(!response.ok);
      console.log(response.status + " " + response.statusText);
      return response.status; // test: change headers
    }
    const processedResponse = await response.json();
    console.log(processedResponse); // processedResponse is object, a JavaScript object
    return processedResponse;
  } catch (error) {
    return error; // test: change url, change method
  }
};
const editTaskInDB = async (taskId, editedTask) => {
  const task = { description: editedTask };
  try {
    const response = await fetch(`http://localhost:3000/${taskId}`, {
      method: "PUT",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      console.log(!response.ok);
      console.log(response.status + " " + response.statusText);
      return response.status; // test: change headers
    }
    const processedResponse = await response.json();
    console.log(processedResponse); // processedResponse is object, a JavaScript object
    return processedResponse;
  } catch (error) {
    return error; // test: change url, change method
  }
};

// delete request
const removeTaskFromDB = async (taskId) => {
  try {
    const response = await fetch(`http://localhost:3000/${taskId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      console.log(!response.ok);
      console.log(response.status + " " + response.statusText);
      return response.status; // test: change method
    }
  } catch (error) {
    return error; // test: change url
    // console.log(error.name); // TypeError
    // console.log(error.message); // Failed to fetch
    // console.log(error); //TypeError: Failed to fetch
    // console.error(); // DELETE net::ERR zichtbaar in console sidebar;
  }
};
