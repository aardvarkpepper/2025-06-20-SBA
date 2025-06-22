const formAddTask = document.getElementById('formAddTask');
const labels = formAddTask.querySelectorAll("label");
const taskTable = document.getElementById('taskTable');
const tasklist = [];
const filterStates = {task: "All", category: "All"};

const output1 = document.getElementById('output1');
const output2 = document.getElementById('output2');

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
});
// formAddTask.addEventListener

const addTask = (task) => {
  if (task.deadline == "Invalid Date") {
    const today = new Date();
    task.deadline = today;
  }
  if (isOverdue(task.deadline)) {
    task.status = "Overdue";
  }
  tasklist.push(task);
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
    console.log(`mrObject; category ${mrObject.category}; status ${mrObject.status}`)
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
    console.log(`Attempting to set ${dropdown.value} to ${selectedValue}`)
    // const options = Array.from(dropdown.selectedOptions);
    // for (each of options) {
    //   console.log(`each: ${each}`)
    //   each.selected = "selected";
    // }
    dropdown.value = selectedValue;
    console.log(`The dropdown has ${[...dropdown.selectedOptions]}`)
    console.log (`You have selected ${selectedValue} of type ${type}`)

    console.log(`Dropdown AEL activated; current selected value ${selectedValue}`);

    if (event.target.value === "All") {
      fillTable(tasklist)
    } else {
      console.log("INVOKING");
      const arrayOfFilterObjects = [];
      arrayOfFilterObjects.push({[type]: event.target.value});
      console.log(`INVOKING; ${JSON.stringify(arrayOfFilterObjects)}`);

      fillTable(getFilteredArray(tasklist, arrayOfFilterObjects))

    }
  });
  return dropdown;
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
  console.log(`GFA output ${JSON.stringify(filteredArray)}`)
  return filteredArray;
};

const isOverdue = (dateInput) => {
  const today = new Date();
  output2.textContent = `task: ${dateInput}, today: ${today}`;
  if (today > dateInput) {
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
  if (isOverdue(taskObjectParameter.deadline)) {
    taskObjectParameter.status = "Overdue";
    tasklist[index].deadline = "Overdue";
  }

  status.textContent = taskObjectParameter.status;
  tableRow.appendChild(status);
  taskTable.appendChild(tableRow);
}

const fillTable = (arrayOfTaskObjects) => {
  clearTable();
  if (document.getElementById("typeWork")){
    console.log('Detect');
  }
  addTableHeaders();
  for (let i = 0; i < arrayOfTaskObjects.length; i++) {
    addTableTask(arrayOfTaskObjects[i], i);
  }
}

/**
 * 
 * persist task data using local storage
 * 
 */

const task1 = {
  task: "hamster care",
  category: "Work",
  deadline: "2025-06-19",
  status: "In Progress",
};

const task2 = {
  task: "past care",
  category: "Pastries",
  deadline: "2024-01-02",
  status: "Overdue",
};

const task3 = {
  task: "hamster care",
  category: "Work",
  deadline: "2028-11-12",
  status: "Overdue",
};

const task4 = {
  task: "Past Care",
  category: "Duplicates",
  deadline: "2025-06-19",
  status: "Complete",
};

tasklist.push(task1);
tasklist.push(task2);
tasklist.push(task3);
tasklist.push(task4);



// document.addEventListener("DOMContentLoaded", function() {
//   // hamsterwords.textContent = "On load test successful";
// });

// localStorage.setItem("myData", tasklist);

/**
 * To do:
 * 
 * Update the status of tasks to reflect their progress (e.g., “In Progress,” “Completed,” “Overdue”).
 * via dropdown or button.  Tasklist should update when this is done.
 * Persist task data using local storage so tasks are saved even after refreshing the page.
 */




