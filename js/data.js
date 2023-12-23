const taskData = [
  {
    id: 1,
    title: "First task",
    description: "Just an example task. The description contains text.",
    dueDate: "2024-01-01",
    completed: false,
  },
  {
    id: 2,
    title: "Task (overdue)",
    description: "This task is overdue (due in the past)",
    dueDate: "2023-11-10",
    completed: false,
  },
  {
    id: 3,
    title: "Another task (completed)",
    description: "This task has the property completed: true",
    dueDate: "2023-10-10",
    completed: true,
  },
  {
    id: 4,
    title: "Another completed task",
    description:
      "This task is completed but the due date was before the other one",
    dueDate: "2023-06-01",
    completed: true,
  },
];

const taskList = document.getElementById("task_list");
let idCount = 5;

//read tasks
const readAll = () => {
  localStorage.setItem("object", JSON.stringify(taskData));
  const task = localStorage.getItem("object");
  const taskObject = JSON.parse(task);

  let elements = "";
  taskObject.map(
    (record) =>
      (elements += `
                    <li>
                    <input type="checkbox"  id="task_${record.id}">
                    <label class= "task_title" for="task_${record.id}">${record.title}</label>
                    <p class="task_description">${record.description}</p>
                    <p class="task_dueDate">DueDate: ${record.dueDate}</p>
                    <p class="task_actions">
                    <button class="edit_task" onclick={editTask(${record.id})} id="edit_task">Edit</button>
                    <button class="delete_task" onclick={deleteTask(${record.id})} id="delete_task">Delete</button>
                    </p>
                    </li>
                    `)
  );
  taskList.innerHTML = elements;
};

readAll();

//create & save task
const addTask = () => {
  const title = document.getElementById("new_task_title").value;
  const description = document.getElementById("new_task_description").value;
  const dueDate = document.getElementById("new_task_due_date").value;

  const newTask = {
    id: idCount++,
    title: title,
    description: description,
    dueDate: dueDate,
  };
  taskData.push(newTask);

  modalWrapper.style.display = "none";
  readAll();
};

const saveBtn = document.getElementById("save_task");
saveBtn.addEventListener("click", addTask);

//edit task
const editModalWrapper = document.getElementById("edit_modal_wrapper");

const editTask = (id) => {
  editModalWrapper.style.display = "block";
  const task = taskData.find((task) => task.id === id);
  document.getElementById("task_id").value = task.id;
  document.getElementById("edit_task_title").value = task.title;
  document.getElementById("edit_task_description").value = task.description;
  document.getElementById("edit_task_due_date").value = task.dueDate;
};

const editCloseBtn = document.getElementById("edit_close_modal");
editCloseBtn.addEventListener("click", () => {
  editModalWrapper.style.display = "none";
});

editModalWrapper.addEventListener("click", (event) => {
  if (event.target.id === "edit_modal_wrapper") {
    editModalWrapper.style.display = "none";
  }
});

//update Task

const updateTask = () => {
  const taskId = parseInt(document.getElementById("task_id").value);
  const title = document.getElementById("edit_task_title").value;
  const description = document.getElementById("edit_task_description").value;
  const dueDate = document.getElementById("edit_task_due_date").value;

  const index = taskData.findIndex((task) => task.id === taskId);
  taskData[index] = { id: taskId, title, description, dueDate };

  editModalWrapper.style.display = "none";
  readAll();
};

const updateBtn = document.getElementById("edit_save_task");
updateBtn.addEventListener("click", updateTask);

//delete
const deleteTask = (id) => {
  alert("Are you sure?");
  const index = taskData.findIndex((record) => record.id === id);
  taskData.splice(index, 1);

  readAll();
};
