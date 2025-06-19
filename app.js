const formAddTask = document.getElementById('formAddTask');
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

  output1.textContent = `${task}, ${category}, ${deadline}, ${status}`;

  const labels = formAddTask.querySelectorAll("label");

  let tempString = "";
  for (let i = 0; i < labels.length; i++) {
    console.log(labels[i].textContent)
    tempString += labels[i].textContent;
  }

  output2.textContent = `${tempString}`
});
// formAddTask.addEventListener

const addTask = (task) => {
  taskList.push(task);
}

const clearTable = () => {
  taskTable.textContent="";
}

const addTableHeaders = () => {

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
