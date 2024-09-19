let taskForm = document.getElementById('task-form');
let taskInput = document.getElementById('task-input');
let taskList = document.getElementById('task-list');
let alertWrapper = document.getElementById('alertWrapper');
// create localstorage for to do list 
let todo = JSON.parse(localStorage.getItem("todo-list")) || [];

// function to save todo to local storage 
function saveToLocalStorage() {
    localStorage.setItem("todo-list", JSON.stringify(todo));
}
//function to render to do list if there are already iems saved in tofo array 
function renderToDo() {
    //clear list 
    taskList.innerHTML = '';

    todo.forEach(task => {
        let li = document.createElement('li');
        let div = document.createElement('div'); 
        div.id = task.id
        let taskDescription = document.createElement('p');
        taskDescription.textContent = task.task;

        //create delete element 
        let deleteButton = document.createElement('button');
        deleteButton.id = 'delete' + task.id
        deleteButton.textContent= 'Delete';

          //add event listener to delete button 
        deleteButton.addEventListener('click', function() {
            deleteTask(task.id)
        })

        div.appendChild(taskDescription);
        div.appendChild(deleteButton);
    
        li.appendChild(div);
    
        taskList.appendChild(li);
    })
   

}

renderToDo();


//create item 
function CreateToDoItems() {
    if (taskInput.value === "") {
        alertWrapper.style.display="block";
        alertWrapper.innerHTML='<p>Please enter your todo text!</p>'
    } else {
        //we want to check through the todo list to see if the value is already present 
        let IsPresent = false;
        todo.forEach((element) => {
            if (element.task == taskInput.value) {
                IsPresent = true;
            }
        })

        if (IsPresent) {
            alertWrapper.style.display="block";
            alertWrapper.innerHTML='<p>This item is already present in the list! Please enter a unique value</p>'

        } else {
            // if the value is unique create item 
            alertWrapper.style.display="none";

            let newTask = {
                id:todo.length + 1, 
                task: taskInput.value
            };
            console.log("todoarray" ,todo); 
            todo.push(newTask);
        
       

       

        saveToLocalStorage();  // Save updated array to localStorage
        renderToDo();
        taskInput.value = '';
        }
    }
}

taskForm.addEventListener('submit', (event) => {
    event.preventDefault();

    CreateToDoItems() ;
  
})