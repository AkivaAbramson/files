'use strict'

const STORAGE_KEY = 'todoDB'

var gTodos = _createTodos()
var gFilterBy = 'all'

function getTodosForDisplay() {
    return gTodos.filter(todo => {
        return gFilterBy === 'all' ||
            (gFilterBy === 'done' && todo.isDone) ||
            (gFilterBy === 'active' && !todo.isDone)
    })
}

function toggleTodo(todoId) {
    const todo = gTodos.find(todo => todo.id === todoId)
    todo.isDone = !todo.isDone
    saveToStorage(STORAGE_KEY, gTodos)
}

function removeTodo(todoId) {
    const todoIdx = gTodos.findIndex(todo => todo.id === todoId)
    gTodos.splice(todoIdx, 1)
    saveToStorage(STORAGE_KEY, gTodos)
}

function addTodo(txt) {
    const newTodo = _createTodo(txt)
    gTodos.unshift(newTodo)
    saveToStorage(STORAGE_KEY, gTodos)
}

function setFilter(filterBy) {
    gFilterBy = filterBy
}

function getTodosCount() {
    return gTodos.length
}

function getActiveTodosCount() {
    return gTodos.filter(todo => !todo.isDone).length
}

function _createTodos() {
    var todos = loadFromStorage(STORAGE_KEY)
    // console.log('todos:', todos)
    if (!todos) {
        todos = [
            _createTodo('Learn HTML'),
            _createTodo('Study CSS'),
            _createTodo('Master JS')
        ]
        saveToStorage(STORAGE_KEY, todos)
    }
    return todos
}

function _createTodo(txt) {
    return {
        id: makeId(),
        txt: txt,
        isDone: false,
        value: getRandomInt(10000, 100000),
        createdAt: Date.now()
    }
}


