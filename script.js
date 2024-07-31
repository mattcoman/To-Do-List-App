document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const newTaskInput = document.getElementById('new-task');
    const todoList = document.getElementById('todo-list');

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const renderTasks = () => {
        todoList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.textContent = task.text;
            if (task.completed) {
                li.classList.add('completed');
            }
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.onclick = () => {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            };
            const completeBtn = document.createElement('button');
            completeBtn.textContent = task.completed ? 'Uncomplete' : 'Complete';
            completeBtn.onclick = () => {
                tasks[index].completed = !tasks[index].completed;
                saveTasks();
                renderTasks();
            };
            li.appendChild(completeBtn);
            li.appendChild(deleteBtn);
            todoList.appendChild(li);
        });
    };

    todoForm.onsubmit = (e) => {
        e.preventDefault();
        const newTask = newTaskInput.value.trim();
        if (newTask !== '') {
            tasks.push({ text: newTask, completed: false });
            saveTasks();
            renderTasks();
            newTaskInput.value = '';
        }
    };

    renderTasks();
});
