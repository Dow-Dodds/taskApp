let taskForm = document.getElementById('task-form');
let taskInput = document.getElementById('task-input');
let taskList = document.getElementById('task-list');

taskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    taskText = taskInput.value;

    //create new list item 
    let newTask = document.createElement("li");
    newTask.textContent = taskText;

    //add task to list 
    taskList.appendChild(newTask);

    //clear input 
    taskInput.value = " ";
    console.log("did this run", newTask )
})