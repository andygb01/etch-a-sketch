const DEFAULT_COLOR = '#000000'
const DEFAULT_MODE = 'color'
const DEFAULT_SIZE = 16

let currentColor = DEFAULT_COLOR
let currentMode = DEFAULT_MODE
let currentSize = DEFAULT_SIZE

function setCurrentColor(newColor) {
    currentColor = newColor
}

function setCurrentMode(newMode) {
    activateButton(newMode)
    currentMode = newMode
}

function setCurrentSize(newSize) {
    currentSize = newSize
}

const colorPicker = document.getElementById('colorPicker')
const colorButton = document.getElementById('colorButton')
const eraserButton = document.getElementById('eraserButton')
const clearButton = document.getElementById('clearButton')
const sizeValue = document.getElementById('sizeValue')
const sizeSlider = document.getElementById('sizeSlider')
const grid = document.getElementById('grid')

colorPicker.onchange = (e) => setCurrentColor(e.target.value)
colorButton.onclick = () => setCurrentMode('color')
eraserButton.onclick = () => setCurrentMode('eraser')
clearButton.onclick = () => reloadGrid()
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value)
sizeSlider.onchange = (e) => changeSize(e.target.value)

function changeSize(value) {
    setCurrentSize(value)
    updateSizeValue(value)
    reloadGrid()
}

function updateSizeValue(value) {
    sizeValue.innerHTML = `${value} x ${value}`
}

function reloadGrid() {
    clearGrid()
    setupGrid(currentSize)
}

function clearGrid() {
    grid.innerHTML = ''
}

function setupGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`

    for (let i = 0; i < size * size; i++) {
        const gridElement = document.createElement('div')
        gridElement.addEventListener('mouseover', changeColor)
        grid.appendChild(gridElement)
  }
}

function changeColor(e) {
    if (currentMode === 'color') {
        e.target.style.backgroundColor = currentColor
    } else if (currentMode === 'eraser') {
        e.target.style.backgroundColor = '#fefefe'
    }
}

function activateButton(newMode) {
    if (currentMode === 'color') {
        colorButton.classList.remove('active')
    } else if (currentMode === 'eraser') {
        eraserButton.classList.remove('active')
    }

    if (newMode === 'color') {
        colorButton.classList.add('active')
    } else if (newMode === 'eraser') {
        eraserButton.classList.add('active')
    }
}

window.onload = () => {
    setupGrid(DEFAULT_SIZE)
    activateButton(DEFAULT_MODE)
}

/* GRID BUTTON */


/* DRAW DURING MOUSE CLICK */
