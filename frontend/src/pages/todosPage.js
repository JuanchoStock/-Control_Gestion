export const todosPage = () => {
  const container = document.createElement("div");

  container.classList.add(
    "flex",
    "flex-col",
    "items-center",
    "justify-center",
    "h-screen",
    "bg-gray-200"
  );

  const btnHome = document.createElement("button");

  btnHome.classList.add(
    "bg-blue-500",
    "text-white",
    "p-2",
    "rounded",
    "hover:bg-blue-600",
    "mb-4"
  );

  btnHome.textContent = "Home";

  btnHome.addEventListener("click", () => {
    window.location.pathname = "/home";
  });

  const title = document.createElement("h1");

  title.classList.add("text-3xl", "font-bold", "mb-4");
  title.textContent = "List of Todos";

  // Botón para agregar nueva tarea
  const btnAddTodo = document.createElement("button");
  btnAddTodo.classList.add(
    "bg-green-500",
    "text-white",
    "p-2",
    "rounded",
    "hover:bg-green-600",
    "mb-4"
  );
  btnAddTodo.textContent = "Agregar Tarea";
  
  btnAddTodo.addEventListener("click", () => {
    const newTodoTitle = prompt("Ingrese el título de la nueva tarea:");
    if (newTodoTitle) {
      // Aquí haces la llamada al backend para crear la tarea
      fetch("http://localhost:4000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTodoTitle, completed: false }),
        credentials: "include"
      }).then(() => {
        window.location.reload(); // Recargar la página para mostrar la nueva tarea
      });
    }
  });

  const table = document.createElement("table");

  table.classList.add(
    "w-1/2",
    "bg-white",
    "shadow-md",
    "h-[700px]",
    "overflow-y-scroll"
  );

  const thead = document.createElement("thead");
  const tr = document.createElement("tr");
  const th1 = document.createElement("th");
  th1.classList.add("border", "px-4", "py-2");
  th1.textContent = "ID";

  const th2 = document.createElement("th");
  th2.classList.add("border", "px-4", "py-2");
  th2.textContent = "Title";

  const th3 = document.createElement("th");
  th3.classList.add("border", "px-4", "py-2");
  th3.textContent = "Completed";

  const th4 = document.createElement("th");
  th4.classList.add("border", "px-4", "py-2");
  th4.textContent = "Owner Id";

  const th5 = document.createElement("th");
  th5.classList.add("border", "px-4", "py-2");
  th5.textContent = "Acciones";

  tr.appendChild(th1);
  tr.appendChild(th2);
  tr.appendChild(th3);
  tr.appendChild(th4);
  tr.appendChild(th5);

  thead.appendChild(tr);

  const tbody = document.createElement("tbody");

  tbody.classList.add("text-center");
  table.appendChild(thead);
  table.appendChild(tbody);

  container.appendChild(btnHome);
  container.appendChild(btnAddTodo); // Agregar botón de "Agregar Tarea"
  fetch("http://localhost:4000/todos", {
    credentials: 'include'
  })
    .then((response) => response.json())
    .then((data) => {
      data.todos.forEach((todo) => {
        if (todo.id > 10) return;

        const tr = document.createElement("tr");

        const td1 = document.createElement("td");
        td1.classList.add("border", "px-4", "py-2");
        td1.textContent = todo.id;

        const td2 = document.createElement("td");
        td2.classList.add("border", "px-4", "py-2");
        td2.textContent = todo.title;

        const td3 = document.createElement("td");
        td3.classList.add("border", "px-4", "py-2");
        td3.textContent = todo.completed ? "Sí" : "No";

        const td4 = document.createElement("td");
        td4.classList.add("border", "px-4", "py-2");
        td4.textContent = todo.owner;

        // Columna para los botones de acciones (editar/eliminar)
        const td5 = document.createElement("td");
        td5.classList.add("border", "px-4", "py-2");

        // Botón de editar
        const btnEdit = document.createElement("button");
        btnEdit.classList.add("bg-yellow-500", "text-white", "p-1", "rounded", "hover:bg-yellow-600", "mr-2");
        btnEdit.textContent = "Editar";
        btnEdit.addEventListener("click", () => {
          const newTitle = prompt("Editar título de la tarea:", todo.title);
          if (newTitle) {
            // Llamada al backend para editar la tarea
            fetch(`http://localhost:4000/todos/${todo.id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ title: newTitle }),
              credentials: "include"
            }).then(() => {
              window.location.reload(); // Recargar para mostrar cambios
            });
          }
        });

        // Botón de eliminar
        const btnDelete = document.createElement("button");
        btnDelete.classList.add("bg-red-500", "text-white", "p-1", "rounded", "hover:bg-red-600");
        btnDelete.textContent = "Eliminar";
        btnDelete.addEventListener("click", () => {
          if (confirm(`¿Está seguro que desea eliminar la tarea ${todo.title}?`)) {
            // Llamada al backend para eliminar la tarea
            fetch(`http://localhost:4000/todos/${todo.id}`, {
              method: "DELETE",
              credentials: "include"
            }).then(() => {
              window.location.reload(); // Recargar para actualizar la lista
            });
          }
        });

        td5.appendChild(btnEdit);
        td5.appendChild(btnDelete);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);

        tbody.appendChild(tr);
      });
    });

  container.appendChild(title);
  container.appendChild(table);

  return container;
};
