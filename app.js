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
  // Note:  If user leaves mm/dd/yyyy in date field, defaults to current date.
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

  clearTable();
  addTableHeaders();
  for (let i = 0; i < taskList.length; i++) {
    addTableTask(taskList[i], i);
  }
  // clearTable();
  // addTableHeaders();
  // addTableTask(taskObject);
  
});
// formAddTask.addEventListener

const addTask = (task) => {
  if (task.deadline == "Invalid Date") {
    const today = new Date();
    task.deadline = today;
  }
  if (isOverdue(task.deadline)) {
    task.status="overdue";
  }
  taskList.push(task);
}

// remember, change data on entry, and again on taking the array and outputting it to scrern.

const clearTable = () => {
  taskTable.textContent="";
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
  // console.log(`isOverdue; today: ${today}, taskdate: ${dateInput}`)
  output2.textContent = `task: ${dateInput}, today: ${today}`;
  if (today > dateInput) {
    // console.log(`isOverdue true`)
    return true;
  } else {
    // console.log(`isOverdue false`)
    return false;
  }
}

// Update this and have another function to update status based on deadline.
const addTableTask = (taskObjectParameter, index) => {
  // console.log(`${taskObjectParameter}, ${taskObjectParameter.task}, ${taskObjectParameter.category}, ${taskObjectParameter.deadline}, ${taskObjectParameter.status}`)
  const tableRow = document.createElement("tr");
  const task = document.createElement("td");
  task.textContent = taskObjectParameter.task;
  tableRow.appendChild(task);
  const category = document.createElement("td");
  category.textContent = taskObjectParameter.category;
  tableRow.appendChild(category);
  const deadline= document.createElement("td");
  deadline.textContent = taskObjectParameter.deadline;
  tableRow.appendChild(deadline);
  const status = document.createElement("td");
  if (isOverdue(taskObjectParameter.deadline)) {
    taskObjectParameter.status = "overdue";
    tasklist[i].deadline="overdue";
  }
  status.textContent = convertStatusToString(taskObjectParameter.status);
  tableRow.appendChild(status);
  taskTable.appendChild(tableRow);
}

const fillTable = (arrayOfTaskObjects) => {
  if (arrayOfTaskObjects.length === 0) {
    return;
  }
  let 
  for (let i = 0; i < arrayOfTaskObjects.length; i++) {

  }
}

/**
 * Update status of tasks (completed, in progress, overdue) via dropdown or button
 * auto update task status based on current date, mark as "Overdue" if current date past deadline.
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

// const apple = localStorage.getItem("myData");


// const today = new Date();




//in progress, complete, overdue
//when is this called, really?  On button presses . . . but also when a list is pulled up.  
// note:  use queryselector too.  but this DOES cause page to reload, doesn't it.

// const isTaskOverdue = (deadline) => {
//   const currentDate = new Date();
//   console.log(`isTaskOverdue invoked.  Deadline: ${deadline}.  Current date: ${currentDate}`)
//   return `placeholder`
// }

// const taskData = [
// ];

// const addTask = (taskObject) => {
//   taskData.push(taskObject);
// }
