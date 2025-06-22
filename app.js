/**
 * Note:  Could add entirely new fields to task.
 * Store "type" of data in object, that data regulates whether there's a dropdown or not.
 * e.g. "task" does not get dropdown but "category" and "status" do.
 * But then, how to handle custom behaviors?
 * e.g. we trigger task to "Overdue" if past current date.
 * Could just leave date as the exception to the rule.
 */

const formAddTask = document.getElementById('formAddTask');
const labels = formAddTask.querySelectorAll("label");
const taskTable = document.getElementById('taskTable');
const tasklist = [];

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
  //const status = convertStatusToString(formATData.get('qsstatus'));
  const taskObject = {
    task: task,
    category: category,
    deadline: deadline,
    status: status,
  }
  addTask(taskObject);
  // console.log(`status: ${status}`);
  // console.log(`tasklist, ${JSON.stringify(tasklist)}`)

  output1.textContent = `${task}, ${category}, ${deadline}, ${status}`;

  // when the button is pressed, it clears table and generates.

  // clearTable();
  // addTableHeaders();
  // for (let i = 0; i < tasklist.length; i++) {
  //   addTableTask(tasklist[i], i);
  // }
  fillTable();
  // console.log(JSON.stringify(getUniqueElementsInArrayOfObjects(tasklist, ["category", "status"])))

   console.log(`Filtered output for status overdue and category work ${getFilteredArray(tasklist, [{ status: "Overdue" }, { category: "Work" }])}`);
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

// function to go through the array of objects to get all unique statuses and categories
// sample arrayInput[{status: x, category: y},{status: x, category y}...]
// sample arrayKeyInputs: ["status", "category"]
// sample intermediate set {status: Set of statuses, category: Set of categories}
// sample output:  {status: [arrayofstatuses], category: [[arrayofcategories]]}
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

/**
 * Input:  tasklis [{task: "ham",  .. . }, { . .. }]
 * array of items to filter [""]
 */

// add filters to status and category
const addTableHeaders = () => {
  const tableHeaderRow = document.createElement("tr");
  for (let i = 0; i < labels.length; i++) {
    const tableHeader = document.createElement("th");
    tableHeader.textContent = labels[i].textContent;
    tableHeaderRow.appendChild(tableHeader);

    //{status: [arrayofstatuses], category: [[arrayofcategories]]}
    const mrObject = getUniqueElementsInArrayOfObjects(tasklist, ["category", "status"]);
    console.log(`mrObject; category ${mrObject.category}; status ${mrObject.status}`)
    // note:  change this to work dynamically.  
    if (labels[i].textContent === "Category") {
      const mrDrop = createDropdown(mrObject.category);
      tableHeader.appendChild(mrDrop);
    }
    if (labels[i].textContent === "Task Status") {
      const mrDrop = createDropdown(mrObject.status);
      tableHeader.appendChild(mrDrop);
    }
  }
  taskTable.appendChild(tableHeaderRow);
}

// const addOptionEventListener = (optionElement) => {
//   console.log("aOEL invoked");
//   optionElement.addEventListener('click', (event) => {
//     const option = event.target;
//     console.log(`option value: ${option.value}`);
//   });
// }

const createDropdown = (arrayInput) => {
  const dropdown = document.createElement("select");
  // dropdown.multiple = "multiple"
  const all = document.createElement("option");
  all.value = "All";
  all.textContent = "All";
  // addOptionEventListener(all);
  dropdown.appendChild(all);
  for (let i = 0; i < arrayInput.length; i++) {
    const option = document.createElement("option");
    option.value = arrayInput[i];
    option.textContent = arrayInput[i];
    dropdown.appendChild(option);
    // console.log(`Iteration ${i} value ${arrayInput[i]}`)
  }
  dropdown.addEventListener('change', (event) => {
    const selectedValue = event.target.value;
    console.log(`Dropdown AEL activated; current selected value ${selectedValue}`);
    // this should repopulate the field with clear, addtableheaders,
    // addtabletask (taskobjectparameter, index)
    // so what am I keeping track of?  Well, I want to run potentially multiple filters
    // on the tasklist, get all the task objects that fit the specification, then keep track of
    // the index numbers.  I pop those index numbers in an array, then iterate calling addtabletask
    /**
     * so right now I write something that takes . . .
     */
  });
  return dropdown;
}

/**
 * Takes tasklistInput (the full tasklist) and applies filters.
 * arrayOfObjects like [{status: ["Complete", "In Progress"]}, {category:  ["hamster", "gerbil"]}
 * Iterates through and selects all statuses that are complete OR in progress AND
 * that ALSO have category "hamster" or "gerbil".
 * This is sort of not great, as user doesn't have control.  Maybe they want all tasks that are this
 * OR that.  Well, I'll leave that for now; I know I can do it, but would have to put in more
 * controls that exceed assignment requirements.
 * Would have to restructure it so user can say ((P AND Q) OR R) AND S, that sort of thing.
 * At any rate, THIS function is an additive filter; if ANY of them is true then it selects.
 * 
 */
const getFilteredArray = (tasklistInput, arrayOfObjects) => {
  const setOfIndices = new Set();
  const filteredArray = [];
  for (let i = 0; i < tasklistInput.length; i++) {
    for (let j = 0; j < arrayOfObjects.length; j++) {
      const filter = Object.keys(arrayOfObjects[j]);
      const filterArray = arrayOfObjects[j][filter];
      console.log(`GFA running.  Searching key ${filter} for filterArray ${filterArray}`)
      for (let k = 0; k < filterArray.length; k++) {
        console.log(`GFA running.  K loop ${tasklistInput[i][filter]} and ${arrayOfObjects[j][filter]}`)
        if (tasklistInput[i][filter] == arrayOfObjects[j][filter]) {
          console.log(`Match found.`);
          setOfIndices.add(i);
        }
      }
      //console.log(`Filter substep ${j} key name ${Object.keys(arrayOfObjects[j])}`)

    }
  }
  // for (each of setOfIndices) {
  //   console.log(`SOI ${each}`)
  // }
  // console.log(`Filtered array: ${JSON.stringify(filteredArray)}`);
  for (each of setOfIndices) {
    filteredArray.push(tasklistInput[each]);
  }
  console.log(`GFA output ${JSON.stringify(filteredArray)}`)
  return filteredArray;
};

// const convertStatusToString = (stringInput) => {
//   switch (stringInput) {
//     case "inprogress":
//       return "In Progress";
//     case "complete":
//       return "Complete";
//     case "overdue":
//       return "Overdue";
//     case "In Progress":
//       return "In Progress";
//     case "Complete":
//       return "Complete";
//     case "Overdue":
//       return "Overdue";
//     default:
//       return "Error:  convertStatusToString() input not inprogress, complete, or overdue."
//   }
// }

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

  // add button to make dropdown (requires two clicks).  Radio buttons would be faster (one click)
  // but takes up space and perhaps goes against convention.
  // besides implementing a button and dropdown requires a bit more work so is more interesting.
  // remember when status updated to update data and to update task list.  But aren't we doing this anyways?

  //status.textContent = convertStatusToString(taskObjectParameter.status);
  status.textContent = taskObjectParameter.status;
  tableRow.appendChild(status);
  taskTable.appendChild(tableRow);
}

const fillTable = () => {
  clearTable();
  addTableHeaders();
  for (let i = 0; i < tasklist.length; i++) {
    addTableTask(tasklist[i], i);
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




