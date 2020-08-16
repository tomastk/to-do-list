// Declare variables

const form = document.getElementById("form");
const submitButtom = document.getElementById("submitButtom");
const shower = document.getElementById("shower");

// Add Event Listeners

form.addEventListener("submit", addToDo);
shower.addEventListener("click", deleteToDo);
document.addEventListener("DOMContentLoaded", loadTaskLocalStorage);
// Functions

function addToDo(e) {
  // Prevent Form Submit
  if (
    document.getElementById("title").value != "" &&
    document.getElementById("content").value != ""
  ) {
    e.preventDefault();

    // Declare Title and Content of ToDO
    let title, content;

    // Giving content to title and content

    title = document.getElementById("title").value;
    content = document.getElementById("content").value;

    addTaskDOM(title, content);

    form.reset();

    addTaskLocalStorage(title, content);

    // Adding the DOM Message

    let messageSuccess = new Message("Task added succesfully", "success", form);
    messageSuccess.addToDOM();
    setTimeout(() => {
      messageSuccess.classList.add("hidden");
    }, 1500);
  } else {
    e.preventDefault();
    let messageError = new Message("Please fill the boxes", "error", form);
    messageError.addToDOM();
  }
}
function deleteToDo(e) {
  if (e.target.parentElement.classList[0] === "buttonDelete") {
    e.target.parentElement.parentElement.parentElement.remove();
    let messageError = new Message(
      "Task deleted succesfully",
      "success",
      shower
    );
    messageError.addToDOM();
    deleteTaskLocalStorage(e.target.parentElement.parentElement.textContent);
  }

  // Creating the message of Delete Message
}
function addTaskLocalStorage(title, content) {
  let task = {
    title: title,
    content: content,
  };

  if (localStorage.getItem("tasks") === null) {
    let tasks = [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } else {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

function loadTaskLocalStorage() {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.forEach((task) => {
    let title = task.title;
    let content = task.content;
    addTaskDOM(title, content);
  });
}

function addTaskDOM(title, content) {
  const toDoTitle = document.createElement("h4");
  toDoTitle.textContent = title;
  // Creating Button Delete
  const buttonDelete = document.createElement("a");
  buttonDelete.innerHTML = `<i class="fas fa-trash-alt"></i>`;
  buttonDelete.classList.add("buttonDelete");
  // Adding ButtonDelete to ToDoTitle
  toDoTitle.appendChild(buttonDelete);
  toDoTitle.classList.add("toDoTitle");
  // Creating ToDoContent DOM Element
  const toDoContent = document.createElement("p");
  toDoContent.textContent = content;
  toDoContent.classList.add("toDoContent");
  // Creating ToDo Div
  let divToDo = document.createElement("div");
  // Adding Title to ToDoDiv
  divToDo.appendChild(toDoTitle);
  divToDo.classList.add("showerToDoDiv");
  // Adding Content to toDoDiv
  divToDo.appendChild(toDoContent);
  // Showing ToDODiV in DOM
  shower.appendChild(divToDo);
}

function deleteTaskLocalStorage(title) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));

  tasks.forEach((task, index) => {
    if (task.title == title) {
      tasks.splice(tasks[index], 1);
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });
}

// Class Message

class Message {
  // Status have two valors: success and error

  constructor(message, status, divToAdd) {
    this.message = message;
    this.status = status;
    this.divToAdd = divToAdd;
  }

  addToDOM() {
    let div = document.createElement("div");
    div.classList.add(this.status);
    div.innerHTML = this.message;
    let i;
    if (this.status === "error") {
      i = document.createElement("i");
      i.innerHTML = `<i class="fas fa-exclamation-circle"></i>`;
    } else if (this.status === "success") {
      i = document.createElement("i");
      i.innerHTML = `<i class="fas fa-check-circle"></i>`;
    }
    div.appendChild(i);
    this.divToAdd.appendChild(div);
    setTimeout(() => {
      div.classList.add("hidden");
    }, 500);
  }
}
