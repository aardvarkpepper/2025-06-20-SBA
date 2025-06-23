const formAddTask = document.getElementById('formAddTask');
const labels = formAddTask.querySelectorAll("label");
const taskTable = document.getElementById('taskTable');
const clearData = document.getElementById('cleardata');
let tasklist = [];
let filterStates = {task: "All", category: "All"};
let filterStates2 = {task: "", category: ""};

const output1 = document.getElementById('output1');
const output2 = document.getElementById('output2');

clearData.addEventListener('click', (event) => {
  localStorage.clear();
});

formAddTask.addEventListener('submit', (event) => {
  event.preventDefault();
  // Prevents page reloading, and arguments going to query strings in URL.  Work on a process that uses query strings too.
  const formATData = new FormData(formAddTask);
  const task = formATData.get('qstask');
  const category = formATData.get('qscategory');
  const deadline = new Date(formATData.get('qsdeadline'));
  const status = formATData.get('qsstatus');
  const taskObject = {
    task: task,
    category: category,
    deadline: deadline,
    status: status,
  }
  addTask(taskObject);
  output1.textContent = `${task}, ${category}, ${deadline}, ${status}`;
  fillTable(tasklist);
  saveData();
});
// formAddTask.addEventListener

const saveData = () => {
  localStorage.setItem("tasklist", JSON.stringify(tasklist));
  localStorage.setItem("filterStates", JSON.stringify(filterStates));
  localStorage.setItem("filterStates2", JSON.stringify(filterStates2));
}

const retrieveData = () => {
  if (localStorage.getItem("tasklist")) {
    tasklist = JSON.parse(localStorage.getItem("tasklist"));
  }
  if (localStorage.getItem("filterStates")) {
    filterStates = JSON.parse(localStorage.getItem("filterStates"));
  }
  if (localStorage.getItem("filterStates2")) {
    filterStates2 = JSON.parse(localStorage.getItem("filterStates2"));
  }
}

const addTask = (task) => {
  if (task.deadline == "Invalid Date") {
    const today = new Date();
    task.deadline = today;
  }
  if (isOverdue(task.deadline) && task.status === "In Progress") {
    task.status = "Overdue";
  }
  tasklist.push(task);
  saveData();
}

const clearTable = () => {
  taskTable.textContent = "";
}

const getUniqueElementsInArrayOfObjects = (arrayInput, arrayKeyInputs) => {
  const returnObject = {};
  for (let i = 0; i < arrayKeyInputs.length; i++) {
    returnObject[[arrayKeyInputs[i]]] = new Set();
  }
  for (let i = 0; i < arrayKeyInputs.length; i++) {
    for (let j = 0; j < arrayInput.length; j++) {
      returnObject[[arrayKeyInputs[i]]].add(arrayInput[j][arrayKeyInputs[i]]);
    }
  }
  for (let i = 0; i < arrayKeyInputs.length; i++) {
    returnObject[[arrayKeyInputs[i]]] = [...returnObject[[arrayKeyInputs[i]]]];
  }
  return returnObject;
}


const addTableHeaders = () => {
  const tableHeaderRow = document.createElement("tr");
  for (let i = 0; i < labels.length; i++) {
    const tableHeader = document.createElement("th");
    tableHeader.textContent = labels[i].textContent;
    tableHeaderRow.appendChild(tableHeader);

    const mrObject = getUniqueElementsInArrayOfObjects(tasklist, ["category", "status"]);
    if (labels[i].textContent === "Category") {
      const mrDrop = createDropdown(mrObject.category, "category", filterStates.category);
      tableHeader.appendChild(mrDrop);
    }
    if (labels[i].textContent === "Task Status") {
      const mrDrop = createDropdown(mrObject.status, "status", filterStates.status);
      tableHeader.appendChild(mrDrop);
    }
  }
  taskTable.appendChild(tableHeaderRow);
}

const createDropdown = (arrayInput, type, defaultOption="All") => {
  const dropdown = document.createElement("select");
  const all = document.createElement("option");
  all.value = "All";
  all.textContent = "All";
  dropdown.appendChild(all);
  for (let i = 0; i < arrayInput.length; i++) {
    const option = document.createElement("option");
    option.value = arrayInput[i];
    option.textContent = arrayInput[i];
    dropdown.appendChild(option);
  }
  dropdown.value = defaultOption;

  dropdown.addEventListener('change', (event) => {
    const selectedValue = event.target.value;
    if (type === "category") {
      filterStates.category = selectedValue;
    } else if (type === "status") {
      filterStates.type = selectedValue;
    }
    dropdown.value = selectedValue;

    if (event.target.value === "All") {
      fillTable(tasklist)
      saveData();
    } else {
      const arrayOfFilterObjects = [];
      arrayOfFilterObjects.push({[type]: event.target.value});
      fillTable(getFilteredArray(tasklist, arrayOfFilterObjects))
      saveData();
    }
  });
  return dropdown;
}

// here arrayInput is the array of strings of unique elements in the column.
// e.g. ["In Progress", "Complete", "Overdue"];
// defaultOption is whatever default select is.  e.g. "In Progress".  Note this CHANGES
// for status, say, but this should not be an issue, as we're reading it off data.
// Status update based on date triggers on input and read (is this still true? I forget)
// Should be.  Because input on Sunday could be read on Monday, then the data would be archived
// and would need to be updated.  Anyways, the read is made after the element exists.
const createDropdown2 = (arrayInput, columnName, index) => {
  const dropdown2 = document.createElement("select");
  const valuesArray = ["In Progress", "Complete", "Overdue"];
  for (let i = 0; i < valuesArray.length; i++) {
    const option2 = document.createElement("option");
    option2.value = valuesArray[i];
    option2.textContent = valuesArray[i];
    dropdown2.appendChild(option2);
  }
  dropdown2.value = tasklist[index].status;
  dropdown2.addEventListener('change', (event) => {
    const dropdown2value = event.target.value;
    tasklist[index].status = dropdown2value;
    fillTable(tasklist);
    saveData();
  })
  return dropdown2;
}

const getFilteredArray = (tasklistInput, arrayOfObjects) => {
  const setOfIndices = new Set();
  const filteredArray = [];
  for (let i = 0; i < tasklistInput.length; i++) {
    for (let j = 0; j < arrayOfObjects.length; j++) {
      const filter = Object.keys(arrayOfObjects[j]);
      const filterArray = arrayOfObjects[j][filter];
      for (let k = 0; k < filterArray.length; k++) {
        if (tasklistInput[i][filter] == arrayOfObjects[j][filter]) {
          setOfIndices.add(i);
        }
      }
    }
  }
  for (each of setOfIndices) {
    filteredArray.push(tasklistInput[each]);
  }
  saveData();
  return filteredArray;
};

const isOverdue = (dateInput) => {
  const today = new Date();
  const taskdate = new Date(dateInput)
  output2.textContent = `task: ${taskdate}, today: ${today}`;
  if (today > taskdate) {
    return true;
  } else {
    return false;
  }
}

const addTableTask = (taskObjectParameter, index) => {
  const tableRow = document.createElement("tr");
  const task = document.createElement("td");
  task.textContent = taskObjectParameter.task;
  tableRow.appendChild(task);
  const category = document.createElement("td");
  category.textContent = taskObjectParameter.category;
  tableRow.appendChild(category);
  const deadline = document.createElement("td");
  deadline.textContent = taskObjectParameter.deadline;
  tableRow.appendChild(deadline);
  const status = document.createElement("td");
  // If someone wants to mark something overdue when it isn't, perhaps they have their reasons.
  // So no additional handling to correct overdue to in progress.
  if (isOverdue(taskObjectParameter.deadline) && taskObjectParameter.status === "In Progress") {
    taskObjectParameter.status = "Overdue";
    tasklist[index].status = "Overdue";
    saveData();
  }
  status.textContent = taskObjectParameter.status;
  const dropdown2 = createDropdown2(tasklist, "status", index);
  status.appendChild(dropdown2);
  tableRow.appendChild(status);
  taskTable.appendChild(tableRow);
}

const fillTable = (arrayOfTaskObjects) => {
  clearTable();
  addTableHeaders();
  for (let i = 0; i < arrayOfTaskObjects.length; i++) {
    addTableTask(arrayOfTaskObjects[i], i);
  }
}

// Runs contents on page load.
document.addEventListener("DOMContentLoaded", function() {
  retrieveData();
  fillTable(tasklist);
});

/**
 * 
 * Note:  After closing server and re-opening, data persists and error does not recur.  This is expected.  To replicate error, though, must clear data with
 * 
 * localStorage.clear();
 * 
 * then attempt again.
 * 
 * Note 2:  After clearing data, now table generates with header only.  This is not intended behavior.
 * 
 * Note 3:  Add 
 * 
 */




