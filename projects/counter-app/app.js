const countValue = document.getElementById('count')
const btnUp = document.getElementById('btn-up')
const btnDown = document.getElementById('btn-down')
const stepInput = document.getElementById('step')
let count = 0
let step = 1

function displayCount() {
    countValue.innerHTML = ""
    countValue.innerHTML = count
}

function increase(count, step) {
    count += step
    return count
}

function decrease(count, step) {
    count -= step
    return count
}

btnUp.addEventListener('click', (e) => {
    e.preventDefault()
    count = increase(count,step)
    if ( count < 0 ) {
        count = 0
    }
    displayCount()
})

btnDown.addEventListener('click', (e) => {
    e.preventDefault()
    count = decrease(count,step)
    if ( count < 0 ) {
        count = 0
    }
    displayCount()
})

stepInput.addEventListener('change' , (e) => {
    e.preventDefault()
    step = parseInt(stepInput.value , 10)
})

displayCount()