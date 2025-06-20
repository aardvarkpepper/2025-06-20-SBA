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
const taskList = [];

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

  // when the button is pressed, it clears table and generates.

  // clearTable();
  // addTableHeaders();
  // for (let i = 0; i < taskList.length; i++) {
  //   addTableTask(taskList[i], i);
  // }
  fillTable();

});
// formAddTask.addEventListener

const addTask = (task) => {
  if (task.deadline == "Invalid Date") {
    const today = new Date();
    task.deadline = today;
  }
  if (isOverdue(task.deadline)) {
    task.status = "overdue";
  }
  taskList.push(task);
}

const clearTable = () => {
  taskTable.textContent = "";
}

const addTableHeaders = () => {
  const tableHeaderRow = document.createElement("tr");
  for (let i = 0; i < labels.length; i++) {
    const tableHeader = document.createElement("th");
    tableHeader.textContent = labels[i].textContent;
    tableHeaderRow.appendChild(tableHeader);
  }
  taskTable.appendChild(tableHeaderRow);
}

const convertStatusToString = (stringInput) => {
  switch (stringInput) {
    case "inprogress":
      return "In Progress";
    case "complete":
      return "Complete";
    case "overdue":
      return "Overdue";
    default:
      return "Error:  convertStatusToString() input not inprogress, complete, or overdue."
  }
}

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
    taskObjectParameter.status = "overdue";
    tasklist[i].deadline = "overdue";
  }
  status.textContent = convertStatusToString(taskObjectParameter.status);
  tableRow.appendChild(status);
  taskTable.appendChild(tableRow);
}

const fillTable = () => {
  clearTable();
  addTableHeaders();
  for (let i = 0; i < taskList.length; i++) {
    addTableTask(taskList[i], i);
  }
}

/**
 * Update status of tasks (completed, in progress, overdue) via dropdown or button
 * update task list whenever new task added or a status is updated.
 * filter tasks by status or category
 * 
 * persist task data using local storage
 * 
 */

const task1 = {
  task: "hamster care",
  category: "Work",
  deadline: "2025-06-19",
  status: "Complete",
};

const task2 = {
  task: "past care",
  category: "Pastries",
  deadline: "2024-01-02",
  status: "Incomplete",
};

const task3 = {
  task: "future care",
  category: "Futurama",
  deadline: "2028-11-12",
  status: "In Progress",
};

const task4 = {
  task: "Past Care",
  category: "Duplicates",
  deadline: "2025-06-19",
  status: "In Progress",
};


// document.addEventListener("DOMContentLoaded", function() {
//   // hamsterwords.textContent = "On load test successful";
// });

// localStorage.setItem("myData", taskList);




