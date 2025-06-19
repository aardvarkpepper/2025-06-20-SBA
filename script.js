// Function to compare the task date with the current date
function compareDates(taskDateString) {
    // Get the current date
    const currentDate = new Date();
    // Set hours, minutes, seconds, and milliseconds to 0 for accurate date-only comparison
    currentDate.setHours(0, 0, 0, 0);

    // Parse the task date string into a Date object
    const taskDate = new Date(taskDateString);
    // Set hours, minutes, seconds, and milliseconds to 0 for accurate date-only comparison
    taskDate.setHours(0, 0, 0, 0);

    const resultElement = document.getElementById('result');

    if (taskDate.getTime() === currentDate.getTime()) {
        resultElement.textContent = 'The task date is today!';
        resultElement.style.color = 'blue';
    } else if (taskDate.getTime() < currentDate.getTime()) {
        resultElement.textContent = 'The task date is in the past.';
        resultElement.style.color = 'red';
    } else {
        resultElement.textContent = 'The task date is in the future.';
        resultElement.style.color = 'green';
    }
}

// Event Listener function
function handleFormSubmit(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const taskDateInput = document.getElementById('taskDate');
    const taskDateValue = taskDateInput.value; // This will be in "YYYY-MM-DD" format

    // Call the separate comparison function
    compareDates(taskDateValue);
}

// Add the event listener to the form
const taskForm = document.getElementById('taskForm');
taskForm.addEventListener('submit', handleFormSubmit);