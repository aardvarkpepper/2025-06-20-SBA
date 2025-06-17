const formAddTask = document.getElementById('formAddTask');

const hamsterwords = document.getElementById('hamsterwords');

const date = new Date();

formAddTask.addEventListener('submit', (event) => {
  event.preventDefault();
  // Prevents page reloading, and arguments going to query strings in URL.  Work on a process that uses query strings too.
  const formData = new FormData(formAddTask);
  const task = formData.get('qstask');
  const category = formData.get('qscategory');
  const deadline = document.getElementById('deadline').value;
  const status = formData.get('qsstatus');
  hamsterwords.textContent = `${task}, ${category}, ${deadline}, ${status}; today's date is ${JSON.stringify(currentDateToObject())} task date is ${JSON.stringify(formDateToObject(deadline))}`;
})

const formDateToObject = (stringdate) => {
  return {
    year: Number(stringdate.slice(0,4)),
    month: Number(stringdate.slice(5,7)),
    day: Number(stringdate.slice(8,10)),
  }
}

const currentDateToObject = () => {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  }
}

const isTaskOverdue = () => {

}