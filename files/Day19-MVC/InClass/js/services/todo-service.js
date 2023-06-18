'use strict'
const STORAGE_KEY = 'todosDB'
var gTodos = _createTodos()
var gFilterBy = 'all'

function getTodosForDisplay() {
    if (gFilterBy === 'all') return gTodos
    return gTodos.filter(todo =>
        todo.isDone && gFilterBy === 'done' ||
        !todo.isDone && gFilterBy === 'active')

}

function toggleTodo(todoId) {
    const todo = gTodos.find(todo => todo.id === todoId)
    todo.isDone = !todo.isDone
    saveToLocalStorage(STORAGE_KEY, gTodos)
}

function removeTodo(todoId) {
    const todoIdx = gTodos.findIndex(todo => todo.id === todoId)
    gTodos.splice(todoIdx, 1)
    saveToLocalStorage(STORAGE_KEY, gTodos)
}

function addTodo(txt) {
    var newTodo = _createTodo(txt)
    gTodos.unshift(newTodo)
    saveToLocalStorage(STORAGE_KEY, gTodos)
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
    var todos = loadFromLocalStorage(STORAGE_KEY)
    // console.log('todos:', todos)
    if (!todos) {
        todos = [
            _createTodo('Learn HTML'),
            _createTodo('Study CSS'),
            _createTodo('Master JS')
        ]
        saveToLocalStorage(STORAGE_KEY, todos)
    }
    return todos
}

function _createTodo(txt) {
    return {
        id: _makeId(),
        txt,
        isDone: false
    }
}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}
