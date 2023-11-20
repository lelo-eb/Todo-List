document.addEventListener('DOMContentLoaded', function() {
    const todoList = document.querySelector('#todo-list');
    const form = document.querySelector('#add-todo');
    const input = document.querySelector('#add-item');

    // Load todos from local storage if available
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    savedTodos.forEach(todoObject => {
        if (typeof todoObject === 'object' && todoObject.text) {
            const newTodo = createTodoElement(todoObject);
            todoList.appendChild(newTodo);
        }
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const todoText = input.value.trim();
        if (todoText) {
            const todoObject = {
                text: todoText,
                completed: false
            };
            const newTodo = createTodoElement(todoObject);
            todoList.appendChild(newTodo);

            // Save todos to local storage
            const todos = JSON.parse(localStorage.getItem('todos')) || [];
            todos.push(todoObject);
            localStorage.setItem('todos', JSON.stringify(todos));

            input.value = '';
        }
    });

    function createTodoElement(todoObject) {
        const newTodo = document.createElement('li');
        const todoSpan = document.createElement('span');
        const removeCheckbox = document.createElement('input');
        removeCheckbox.type = 'checkbox';
        removeCheckbox.classList.add('remove-checkbox');
        todoSpan.innerText = todoObject.text;
        newTodo.appendChild(removeCheckbox);
        newTodo.appendChild(todoSpan);

        if (todoObject.completed) {
            newTodo.classList.add('completed');
        }

        // Event listener for checkbox to remove todo item
        removeCheckbox.addEventListener('change', function() {
            if (removeCheckbox.checked) {
                newTodo.remove();
                // Remove todo from local storage
                const todos = JSON.parse(localStorage.getItem('todos'));
                const updatedTodos = todos.filter(todo => todo.text !== todoObject.text);
                localStorage.setItem('todos', JSON.stringify(updatedTodos));
            }
        });

        // Add event listener to mark todo as completed when clicking on the text
        todoSpan.addEventListener('click', function() {
            newTodo.classList.toggle('completed');
            todoObject.completed = !todoObject.completed;
            // Update todo in local storage
            const todos = JSON.parse(localStorage.getItem('todos'));
            const updatedTodos = todos.map(todo => {
                if (todo.text === todoObject.text) {
                    return todoObject;
                }
                return todo;
            });
            localStorage.setItem('todos', JSON.stringify(updatedTodos));
        });

        return newTodo;
    }
});
