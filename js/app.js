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
        const li = document.createElement('li');

        if (task.complete === false) { 
            li.innerHTML = `
                <div class="task-wrapper">
                    <p id="taskLine-${task.id}">${task.task}</p>
                    <div class="taskActionWrapper">  
                            <button id="complete-${task.id}" class="complete-button"> 
                                Mark as Complete
                            </button>           
                            <button id="delete-${task.id}" class="delete-button"> 
                                Delete <span class="material-symbols-outlined">Delete</span>
                            </button> 
                    </div> 
                </div>
            `;
        } else if (task.complete === true)  {
            li.innerHTML = `
            <div class="task-wrapper">
                <p class="completeText" id="taskLine-${task.id}">${task.task}</p>
                <div class="taskActionWrapper">             
                    <button id="complete-${task.id}" class="complete-button"> 
                               <span class="material-symbols-outlined"> verified </span>
                    </button>
                    <button id="delete-${task.id}" class="delete-button"> 
                        Delete <span class="material-symbols-outlined">Delete</span>
                    </button> 
                </div> 
            </div>
        `;
        }

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
                task: taskInput.value,
                complete: false,
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


function deleteTask(taskid) {
    let taskIndex = todo.findIndex((obj) => obj.taskid === taskid);
    todo.splice(taskIndex, 1);
    renderToDo();
    saveToLocalStorage();
    console.log(todo, taskid);
   
} 

function completeTask(taskid) {

    todo.forEach(task => {
        if (task.id === taskid) {
        task.complete = true;
        }
    });
    saveToLocalStorage();
    renderToDo();
    console.log("complete tast",taskid, todo)
}