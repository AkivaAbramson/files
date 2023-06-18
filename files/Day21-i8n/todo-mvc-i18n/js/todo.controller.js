'use strict'

// This is our controller it is responsible for rendering the view and action upon events
console.log('Todo App')

function onInit() {
    doTrans()
    renderTodos()
}

function renderTodos() {
    const todos = getTodosForDisplay()
    var strHTMLs = todos.map(todo => `
                  <li class="${(todo.isDone) ? 'done' : ''}" 
                      onclick="onToggleTodo('${todo.id}')">
                      ${todo.txt}
                      <span class="mute">${formatNum(todo.value)}</span>
                      <span> ${formatDate(todo.createdAt)}</span>
                      <button class="btn-delete" onclick="onRemoveTodo('${todo.id}', event)">
                         &times;
                      </button>
                  </li>`
    )

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
    // Stop the propegation of the click event so the LI onclick will not trigger
    ev.stopPropagation()
    // console.log('Remove:', todoId)
    if (confirm(getTrans('sure'))) {
        removeTodo(todoId)
        renderTodos()
    }
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

function onSetLang(lang) {
    setLang(lang)
    // if lang is hebrew add RTL class to document.body
    if (lang === 'he') document.body.classList.add('rtl')
    else document.body.classList.remove('rtl')
    renderTodos()
    doTrans()
}


