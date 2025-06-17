const formAddTask = document.getElementById('formAddTask');

const hamsterwords = document.getElementById('hamsterwords');

formAddTask.addEventListener('submit', (event) => {
  event.preventDefault();
  // Prevents page reloading, and arguments going to query strings in URL.  Work on a process that uses query strings too.
  const formData = new FormData(formAddTask);
  const task = formData.get('qstask');
  const category = formData.get('qscategory');
  const deadline = document.getElementById('deadline').value;
  const status = formData.get('qsstatus');
  hamsterwords.textContent = `${task}, ${category}, ${deadline}, ${status}`;
})