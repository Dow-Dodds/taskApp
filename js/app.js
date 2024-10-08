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

function updateToDo(){
    renderToDo();
    saveToLocalStorage();
    
}
//function to render to do list if there are already iems saved in tofo array 
function renderToDo() {
    //clear list 
    taskList.innerHTML = '';

    todo.forEach(task => {
        const li = document.createElement('li');

            li.innerHTML = `
                <div class="task-wrapper">
                    <div id="taskText-${task.id}">
                        <p class="${task.complete ? 'completeText' : ''}" id="taskLine-${task.id}">${task.task}</p>
                    </div>
                    <div class="taskActionWrapper">  
                            ${!task.complete ? `
                                <button id="edit-${task.id}" class="edit-button" aria-label="Edit task button"> 
                                    Edit <span class="material-symbols-outlined">edit</span>
                                </button>   
                                <button id="complete-${task.id}" class="complete-button" aria-label="Complete task button"> 
                                    Mark as Complete
                                </button>           
                                <button id="delete-${task.id}" class="delete-button" aria-label="Delete task button"> 
                                    Delete <span class="material-symbols-outlined">Delete</span>
                                </button> 
                            
                            ` : `
                                <button id="edit-${task.id}" class="edit-button hidden" aria-label="Edit task button"> 
                                    Edit <span class="material-symbols-outlined">edit</span>
                                </button>  
                                <button id="complete-${task.id}" class="complete-button"> 
                                    <span class="material-symbols-outlined"> verified </span>
                                </button>
                                <button id="delete-${task.id}" class="delete-button"> 
                                    Delete <span class="material-symbols-outlined">Delete</span>
                                </button> 
                            `}
                           
                    </div> 
                </div>
            `;

        li.querySelector('.edit-button').addEventListener('click', () => {
                editTask(task.id);
        })

        //add delete button event listener 
        li.querySelector('.delete-button').addEventListener('click', () => {
            deleteTask(task.id);
        })

        li.querySelector('.complete-button').addEventListener('click', () => {
            completeTask(task.id);
        })



        //apend li to the list 
        taskList.appendChild(li);
       
    })
   

}

renderToDo();


//create item 
function CreateToDoItems() {
    if (taskInput.value.trim() === "") {
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
                id:Date.now(), 
                task: taskInput.value,
                complete: false,
            };
            console.log("todoarray" ,todo); 
            todo.push(newTask);
        
       

       

        updateToDo()
        taskInput.value = '';
        }
    }
}

taskForm.addEventListener('submit', (event) => {
    event.preventDefault();

    CreateToDoItems() ;
  
})

function saveChanges(taskIndex, taskid) {
    newTaskValue = document.getElementById("taskInput-" + taskid).value;
    todo[taskIndex].task = newTaskValue;
    console.log("new value", taskIndex, newTaskValue, todo);
    console.log("helloe" ,todo[taskIndex]);
    updateToDo()
}

function editTask(taskid) {
    let taskTextWrapper = document.getElementById("taskText-" + taskid)
    let taskIndex = todo.findIndex(obj => obj.id == taskid)
    let originalTask = todo[taskIndex].task
    console.log("task",originalTask, todo)
    taskTextWrapper.innerHTML = `
        <input type="text" id="taskInput-${taskid}" placeholder="${originalTask}... " value="" />
        <button onclick="saveChanges(${taskIndex}, ${taskid})" aria-label="Save changes button">Save</button> 
    `
} 

function deleteTask(taskid) {
    let taskIndex = todo.findIndex(obj => obj.id == taskid)
    todo.splice(taskIndex, 1);
    updateToDo();
} 

function completeTask(taskid) {

    todo.forEach(task => {
        if (task.id === taskid) {
        task.complete = true;
        }
    });
    
    updateToDo();
    console.log("complete tast",taskid, todo)
}

console.log("date now test", Date.now())