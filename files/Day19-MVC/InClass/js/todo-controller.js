'use strict'

function onInit() {
    // console.log('hi')
    renderTodos()
}

function renderTodos() {
    const todos = getTodosForDisplay()
    var strHTMLs = todos.map(todo => `
                <li onclick="onToggleTodo('${todo.id}')"
                    class="${todo.isDone ? 'done' : ''}">
                    ${todo.txt}
                    <button onclick="onRemoveTodo('${todo.id}',event)">x</button>
                </li>`)

    document.querySelector('.todo-list').innerHTML = strHTMLs.join('')

    document.querySelector('.total-todos-count').innerText = getTodosCount()
    document.querySelector('.active-todos-count').innerText = getActiveTodosCount()
}

function onToggleTodo(todoId) {
    // console.log('Toggle:', todoId)
    toggleTodo(todoId)
    renderTodos()
}

function onRemoveTodo(todoId, ev) {
    ev.stopPropagation()
    console.log('Remove:', todoId)
    removeTodo(todoId)
    renderTodos()
}

function onAddTodo(ev) {
    ev.preventDefault()
    const elInput = document.querySelector('input[name="todo-txt"]')
    const txt = elInput.value
    addTodo(txt)
    renderTodos()
    elInput.value = ''
}

function onSetFilter(filterBy) {
    // console.log('filterBy', filterBy)
    setFilter(filterBy)
    renderTodos()

}


