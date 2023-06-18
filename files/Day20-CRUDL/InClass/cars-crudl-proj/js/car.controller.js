'use strict'

function onInit() {
    renderVendors()
    renderFilterByQueryParams()
    renderCars()
}

function renderVendors() {
    const vendors = getVendors()
    const strHTMLs = vendors.map(vendor => `<option>${vendor}</option>`)

    strHTMLs.unshift('<option value="">Select Vendor</option>')

    document.querySelector('.filter-vendor-select').innerHTML = strHTMLs.join('')

}

function renderCars() {
    var cars = getCars()
    var strHtmls = cars.map(car => `
        <article class="car-preview">
            <button title="Delete car" class="btn-remove" onclick="onRemoveCar('${car.id}')">X</button>
            <h5>${car.vendor}</h5>
            <h6>Up to <span>${car.maxSpeed}</span> KMH</h6>
            <button onclick="onReadCar('${car.id}')">Details</button>
            <button onclick="onUpdateCar('${car.id}')">Update</button>
            <img title="Photo of ${car.vendor}" onerror="this.src='img/default.png'" src="img/${car.vendor}.png" alt="Car by ${car.vendor}">
        </article> 
        `
    )
    document.querySelector('.cars-container').innerHTML = strHtmls.join('')
}

function onRemoveCar(carId) {
    removeCar(carId)
    renderCars()
    flashMsg(`Car Deleted`)
}

function onAddCar() {
    var vendor = prompt('vendor?')
    if (vendor) {
        const car = addCar(vendor)
        renderCars()
        flashMsg(`Car Added (id: ${car.id})`)
    }
}

function onUpdateCar(carId) {
    const car = getCarById(carId)
    var newSpeed = +prompt('Speed?', car.maxSpeed)
    if (newSpeed && car.maxSpeed !== newSpeed) {
        const car = updateCar(carId, newSpeed)
        renderCars()
        flashMsg(`Speed updated to: ${car.maxSpeed}`)
    }
}

function onReadCar(carId) {
    const car = getCarById(carId)
    const elModal = document.querySelector('.modal')
    elModal.querySelector('h3').innerText = car.vendor
    elModal.querySelector('h4 span').innerText = car.maxSpeed
    elModal.querySelector('p').innerText = car.desc
    elModal.classList.add('open')
}

function onSetFilterBy(filterBy) {
    console.log('filterBy', filterBy)
    filterBy = setCarFilter(filterBy)
    renderCars()

    const queryParams = `?vendor=${filterBy.vendor}&minSpeed=${filterBy.minSpeed}`
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryParams
    window.history.pushState({ path: newUrl }, '', newUrl)

}

function onCloseModal() {
    document.querySelector('.modal').classList.remove('open')
}

function flashMsg(msg) {
    const el = document.querySelector('.user-msg')
    el.innerText = msg
    el.classList.add('open')
    setTimeout(() => {
        el.classList.remove('open')
    }, 3000)
}

function renderFilterByQueryParams() {
    const queryParams = new URLSearchParams(window.location.search)
    const filterBy = {
        vendor: queryParams.get('vendor') || '',
        minSpeed: +queryParams.get('minSpeed') || 0
    }

    if (!filterBy.vendor && !filterBy.minSpeed) return

    document.querySelector('.filter-vendor-select').value = filterBy.vendor
    document.querySelector('.filter-speed-range').value = filterBy.minSpeed
    setCarFilter(filterBy)
}

function onSetSortBy() {
    const prop = document.querySelector('.sort-by').value
    const isDesc = document.querySelector('.sort-desc').checked

    if (!prop) return

    const sortBy = {}
    sortBy[prop] = (isDesc) ? -1 : 1

    console.log('sortBy', sortBy)

    // Shorter Syntax:
    // const sortBy = {
    //     [prop] : (isDesc)? -1 : 1
    // }

    setCarSort(sortBy)
    renderCars()
}


function onNextPage() {
    nextPage()
    renderCars()
}