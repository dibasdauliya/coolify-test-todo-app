const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

let todos = JSON.parse(localStorage.getItem("todos") || "[]");

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
  list.innerHTML = "";
  todos.forEach((todo, i) => {
    const li = document.createElement("li");
    if (todo.done) li.classList.add("done");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;
    checkbox.addEventListener("change", () => {
      todos[i].done = !todos[i].done;
      saveTodos();
      renderTodos();
    });

    const span = document.createElement("span");
    span.textContent = todo.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", () => {
      todos.splice(i, 1);
      saveTodos();
      renderTodos();
    });

    li.append(checkbox, span, deleteBtn);
    list.appendChild(li);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  todos.push({ text, done: false });
  saveTodos();
  renderTodos();
  input.value = "";
});

renderTodos();
