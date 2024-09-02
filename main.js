window.onload = function() {
    // استرجاع المهام المحفوظة عند تحميل الصفحة
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const todoList = document.getElementById("todo-list");

    // دالة لإضافة مهمة جديدة إلى القائمة
    function addTask(taskText, isCompleted = false) {
        const taskItem = document.createElement("li");
        const taskTextElement = document.createElement("span");
        taskTextElement.textContent = taskText;

        // زر Done/Enable Done
        const toggleDoneBtn = document.createElement("button");
        toggleDoneBtn.textContent = isCompleted ? "Enable Done" : "Done";
        toggleDoneBtn.addEventListener("click", function() {
            if (taskItem.classList.contains("completed")) {
                taskItem.classList.remove("completed");
                toggleDoneBtn.textContent = "Done";
                updateLocalStorage();
            } else {
                taskItem.classList.add("completed");
                toggleDoneBtn.textContent = "Done";
                updateLocalStorage();
            }
        });

        // إضافة الفئة المكتملة إذا كانت المهمة مكتملة
        if (isCompleted) {
            taskItem.classList.add("completed");
        }

        // زر Delete
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", function() {
            taskItem.remove();
            updateLocalStorage();
        });

        // زر Edit
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.addEventListener("click", function() {
            const newTaskInput = document.createElement("input");
            newTaskInput.type = "text";
            newTaskInput.value = taskTextElement.textContent;
            taskItem.insertBefore(newTaskInput, taskTextElement);
            taskItem.removeChild(taskTextElement);

            editBtn.textContent = "Save";

            editBtn.addEventListener("click", function() {
                taskTextElement.textContent = newTaskInput.value.trim();
                taskItem.insertBefore(taskTextElement, newTaskInput);
                taskItem.removeChild(newTaskInput);
                editBtn.textContent = "Edit";
                updateLocalStorage();
            }, { once: true });
        });

        // إضافة العناصر إلى المهمة
        taskItem.appendChild(taskTextElement);
        taskItem.appendChild(editBtn);
        taskItem.appendChild(toggleDoneBtn);
        taskItem.appendChild(deleteBtn);

        // إضافة المهمة إلى القائمة
        todoList.appendChild(taskItem);

        // تحديث التخزين المحلي
        updateLocalStorage();
    }

    // تحديث المهام في localStorage
    function updateLocalStorage() {
        const tasks = [];
        todoList.querySelectorAll('li').forEach(taskItem => {
            const taskText = taskItem.querySelector('span').textContent;
            const isCompleted = taskItem.classList.contains('completed');
            tasks.push({ text: taskText, completed: isCompleted });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // استرجاع المهام المحفوظة
    savedTasks.forEach(task => addTask(task.text, task.completed));

    // إضافة مهمة جديدة
    document.getElementById("add-btn").addEventListener("click", function() {
        const taskInput = document.getElementById("todo-input");
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        addTask(taskText);
        taskInput.value = "";
    });
};
