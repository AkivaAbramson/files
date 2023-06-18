'use strict'

// saveToLocalStorage('users', [1, 2, 3])

function saveToLocalStorage(key, value) {
    const json = JSON.stringify(value)
    localStorage.setItem(key, json)
}

function loadFromLocalStorage(key) {
    const json = localStorage.getItem(key)
    return JSON.parse(json)
}