export const todosPage = () => {
  const container = document.createElement("div");

  // Cambiar el color del background.
  container.classList.add(
    "flex",
    "flex-col",
    "items-center",
    "justify-center",
    "min-h-screen",
    "bg-blue-200", // Fondo celeste
    "text-white"
  );

  // Botón Home
  const btnHome = document.createElement("button");
  btnHome.classList.add(
    "bg-indigo-700",
    "text-white",
    "p-3",
    "rounded-full",
    "shadow-lg",
    "hover:bg-indigo-800",
    "transition",
    "duration-300",
    "ease-in-out",
    "mb-4"
  );
  btnHome.textContent = "Home";
  btnHome.addEventListener("click", () => {
    window.location.pathname = "/home";
  });

  // Título
  const title = document.createElement("h1");
  title.classList.add("text-4xl", "font-bold", "mb-6");
  title.textContent = "List of Todos";

  // Tabla
  const table = document.createElement("table");
  table.classList.add(
    "w-3/4",
    "bg-white",
    "shadow-2xl",
    "rounded-lg",
    "overflow-hidden",
    "text-gray-800"
  );

  // Crear la cabecera de la tabla
  const thead = document.createElement("thead");
  thead.classList.add("bg-indigo-600", "text-white");

  const tr = document.createElement("tr");

  const th1 = document.createElement("th");
  th1.classList.add("px-6", "py-3", "border-b");
  th1.textContent = "ID";

  const th2 = document.createElement("th");
  th2.classList.add("px-6", "py-3", "border-b");
  th2.textContent = "Title";

  const th3 = document.createElement("th");
  th3.classList.add("px-6", "py-3", "border-b");
  th3.textContent = "Completed";

  const th4 = document.createElement("th");
  th4.classList.add("px-6", "py-3", "border-b");
  th4.textContent = "Owner Id";

  const th5 = document.createElement("th");
  th5.classList.add("px-6", "py-3", "border-b");
  th5.textContent = "Actions"; // Nueva columna para acciones

  tr.appendChild(th1);
  tr.appendChild(th2);
  tr.appendChild(th3);
  tr.appendChild(th4);
  tr.appendChild(th5); // Añadir la nueva columna al encabezado
  thead.appendChild(tr);

  const tbody = document.createElement("tbody");

  table.appendChild(thead);
  table.appendChild(tbody);

  // Función para agregar una fila a la tabla
  const addTodoToTable = (todo) => {
    const tr = document.createElement("tr");
    tr.classList.add("bg-gray-100", "hover:bg-gray-200");

    const td1 = document.createElement("td");
    td1.classList.add("px-6", "py-3", "border-b", "text-center");
    td1.textContent = todo.id;

    const td2 = document.createElement("td");
    td2.classList.add("px-6", "py-3", "border-b", "text-center");
    td2.textContent = todo.title;

    const td3 = document.createElement("td");
    td3.classList.add("px-6", "py-3", "border-b", "text-center");
    td3.textContent = todo.completed ? "Sí" : "No";

    const td4 = document.createElement("td");
    td4.classList.add("px-6", "py-3", "border-b", "text-center");
    td4.textContent = todo.owner;

    const td5 = document.createElement("td");
    td5.classList.add("px-6", "py-3", "border-b", "text-center");

    // Botón de eliminar
    const btnDelete = document.createElement("button");
    btnDelete.classList.add(
      "bg-red-500",
      "text-white",
      "p-2",
      "rounded",
      "hover:bg-red-600",
      "transition",
      "duration-300",
      "ease-in-out"
    );
    btnDelete.textContent = "Delete";
    btnDelete.addEventListener("click", () => {
      console.log(`Eliminando todo con ID: ${todo.id}`);
      tr.remove(); // Remover la fila de la tabla
    });

    // Botón de editar (color amarillo)
    const btnEdit = document.createElement("button");
    btnEdit.classList.add(
      "bg-yellow-500", // Cambiado de color el botón
      "text-white",
      "p-2",
      "rounded",
      "hover:bg-yellow-600", // Hover amarillo
      "transition",
      "duration-300",
      "ease-in-out",
      "ml-2"
    );
    btnEdit.textContent = "Edit";
    btnEdit.addEventListener("click", () => {
      // Solicitar nueva descripción
      const newTitle = prompt("Ingrese la nueva descripción del Todo:", todo.title);
      if (!newTitle) {
        alert("Debe ingresar una descripción.");
        return;
      }

      // Solicitar si está completado
      const newCompletedInput = prompt("¿Está completado el todo? (Sí/No)", todo.completed ? "Sí" : "No").toLowerCase();
      const newCompleted = newCompletedInput === "sí" || newCompletedInput === "si";

      // Actualizar el todo
      todo.title = newTitle;
      todo.completed = newCompleted;

      // Actualizar visualmente la tabla
      td2.textContent = newTitle;
      td3.textContent = newCompleted ? "Sí" : "No";

      // Si hay backend, se puede enviar aquí la solicitud de actualización al servidor
      console.log(`Todo actualizado con ID: ${todo.id}`, todo);
    });

    td5.appendChild(btnDelete);
    td5.appendChild(btnEdit); // Añadir botón de editar

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);

    tbody.appendChild(tr);
  };

  // Añadir los botones al contenedor
  container.appendChild(btnHome);
  container.appendChild(title);
  container.appendChild(table);

  let commonOwner = null; // Variable para almacenar el owner común

  // Cargar los todos existentes
  fetch("http://localhost:4000/todos", {
    credentials: "include"
  })
    .then((response) => response.json())
    .then((data) => {
      data.todos.forEach((todo, index) => {
        if (todo.id === 0) return;

        // Guardar el primer owner que se encuentre
        if (index === 0) {
          commonOwner = todo.owner;
        }

        addTodoToTable(todo);
      });
    });

  // Acción para crear un nuevo todo
  const btnCreate = document.createElement("button");
  btnCreate.classList.add(
    "bg-green-500",
    "text-white",
    "p-3",
    "rounded-full",
    "shadow-lg",
    "hover:bg-green-600",
    "transition",
    "duration-300",
    "ease-in-out",
    "mt-4" // Cambiar a mt-4 para agregar espacio arriba del botón
  );
  btnCreate.textContent = "Create new Todo";

  btnCreate.addEventListener("click", () => {
    // Obtener el ID más alto en la tabla
    let maxId = 0;
    document.querySelectorAll("tbody tr").forEach((row) => {
      const id = parseInt(row.children[0].textContent);
      if (id > maxId) {
        maxId = id;
      }
    });

    // Generar el siguiente ID
    const newId = maxId + 1;

    // Solicitar la descripción del todo
    const title = prompt("Ingrese la descripción del Todo:");
    if (!title) {
      alert("Debe ingresar una descripción.");
      return; // Si no ingresa una descripción, se cancela la creación
    }

    // Solicitar si el todo está completado
    const completedInput = prompt("¿Está completado el todo? (Sí/No)").toLowerCase();
    const completed = completedInput === "sí" || completedInput === "si" ? true : false;

    const newTodo = {
      id: newId, // Asignar el nuevo ID
      title: title,
      completed: completed,
      owner: commonOwner || "User123" // Usar el owner común o un default si no hay
    };

    // Agregar el nuevo todo a la tabla visualmente
    addTodoToTable(newTodo);

    // Aquí podrías enviar este nuevo todo al servidor si lo deseas
    console.log("Nuevo todo creado:", newTodo);
  });

  // Colocar el botón "Crear Todo" debajo de la tabla
  container.appendChild(btnCreate);

  return container;
};
