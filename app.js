const formAddTask = document.getElementById('formAddTask');
const taskTable = document.getElementById('taskTable');
const taskList = [];

document.addEventListener("DOMContentLoaded", function() {
  hamsterwords.textContent = "On load test successful";
});

const hamsterwords = document.getElementById('hamsterwords');
const chinchillawords = document.getElementById('chinchillawords');
const today = new Date();

formAddTask.addEventListener('submit', (event) => {
  event.preventDefault();
  // Prevents page reloading, and arguments going to query strings in URL.  Work on a process that uses query strings too.
  const formData = new FormData(formAddTask);
  const task = formData.get('qstask');
  const category = formData.get('qscategory');
  const deadline = Date(document.getElementById('deadline').value);
  //populate with current date; but also do validation
  console.log(`Input:  deadline ${deadline}`)
  const status = formData.get('qsstatus');
  hamsterwords.textContent = `${task}, ${category}, ${deadline}, ${status}`;
  chinchillawords.textContent = `The task is overdue:  ${isTaskOverdue(deadline)} today's date ${today}`
})



//in progress, complete, overdue
//when is this called, really?  On button presses . . . but also when a list is pulled up.  
// note:  use queryselector too.  but this DOES cause page to reload, doesn't it.

const isTaskOverdue = (deadline) => {
  const currentDate = new Date();
  console.log(`isTaskOverdue invoked.  Deadline: ${deadline}.  Current date: ${currentDate}`)
  return `placeholder`
}
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

const taskData = [
];

const addTask = (taskObject) => {
  taskData.push(taskObject);
}
