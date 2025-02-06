const addButton = document.querySelector("#addButton");
const addInput = document.querySelector("#addInput");
const todoList = document.querySelector("#todoList");
const customContainer = document.querySelector(".custom-container");
const deleteAll = customContainer.querySelector("#deleteButton");
let todos = [];
runEvents();

function runEvents(){
    addButton.addEventListener("click", addTodo);
    document.addEventListener("DOMContentLoaded", pageLoaded);
    deleteButton.addEventListener("click", deleteAllTodos);

    addInput.addEventListener("keydown", function(e){
        if(e.key === "Enter"){
            e.preventDefault;
            addTodo();
        }
    });
    showAlert("No todos yet! Add a new todo to get started.");
}

function pageLoaded(){ //sayfa yüklendiğinde local'den verileri çek
    let storedTodos;
    try {
        storedTodos = localStorage.getItem("todo");
    } catch (error) {
        console.log(error.message);
    }
    if (storedTodos !== null) {
        todos = JSON.parse(storedTodos); // LocalStorage'dan todos dizisini al
        todos.forEach(function(todo){
            addTodoToUI(todo); // Her todo'yu UI'ye ekle
        });
    }
}

function deleteAllTodos(){
    try {
        while (todoList.firstChild) {
            todoList.removeChild(todoList.firstChild);
        }
        showAlert("No todos yet! Add a new todo to get started.");
        todos = [];
        localStorage.setItem("todo", JSON.stringify(todos));
    } catch (error) {
        console.log(error.message);
    }
}

function addTodo(){
    const trimmedValue = addInput.value.trim();
    if(trimmedValue === "" || trimmedValue === null){ //input boş veya null ise hiçbir şey yapma
        return;
    }
    addTodoToUI(trimmedValue);// toddoo'yu UI'de göster
    addTodoToStorage(trimmedValue);
    showAlert("No todos yet! Add a new todo to get started.");
    addInput.value = "";
    
}

function addTodoToUI(newTodo){
    const li = document.createElement("li");
    const deleteButton = document.createElement("button");

    deleteButton.addEventListener("click", function(){
        let storedTodos;
        try {
            storedTodos = localStorage.getItem("todo");
        } catch (error) {
           console.log(error.message);
        }
        
        if (storedTodos !== null) {
            todos = JSON.parse(storedTodos); // LocalStorage'dan todos dizisini al
        }
        removedTodoContent = deleteButton.parentElement.textContent;
        for (let i = todos.length - 1; i >= 0; i--) {
            if (todos[i] === removedTodoContent) {
                todos.splice(i, 1);
                break; 
            }
        }
        localStorage.setItem("todo", JSON.stringify(todos));
        deleteButton.parentElement.remove();
        showAlert("No todos yet! Add a new todo to get started.");
    });

    deleteButton.setAttribute("type", "button");
    deleteButton.className = "btn-close shadow-none";
    deleteButton.style.minWidth="50px";

    li.innerHTML = "<h5 class='fw-normal fs-5'>" + newTodo + "</h5>";
    li.className = "list-group-item bg-transparent text-dark border-dark d-flex justify-content-between align-items-center text-break py-3 ";
    if(todoList.querySelector("#alertMsg") != null){ // Toddo eklemeden önce alert varsa kaldırır
        todoList.removeChild(todoList.querySelector("#alertMsg"));
    }
    li.appendChild(deleteButton); //her li elemanına buton ekle
    todoList.appendChild(li); // her li elemanını ul'ye ekle
}

function addTodoToStorage(newTodo){
    if(localStorage.getItem("todo") === null){
        todos.push(newTodo);
        localStorage.setItem("todo", JSON.stringify(todos));
    }else{
        todos = JSON.parse(localStorage.getItem("todo"));
        todos.push(newTodo);
        localStorage.setItem("todo", JSON.stringify(todos));
    }
}

function showAlert(message){
    if (todoList.getElementsByTagName("li").length === 0){
        const div = document.createElement("div");
        div.id = "alertMsg";
        div.textContent = message;
        div.className = "alert alert-light";
        todoList.appendChild(div);
    }
}