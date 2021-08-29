const btn = document.getElementById("btn")
const body = document.getElementById("body")
const text = [...document.getElementsByClassName("theme")]
const RValue = document.getElementById("r-value")
const GValue = document.getElementById("g-value")
const BValue = document.getElementById("b-value")

function checkLightOrDarkRGB(r, g, b) {
    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

    // Using the HSP value, determine whether the color is light or dark
    if (hsp > 127.5) {
        return "light"
    } else {
        return "dark"
    }
}

function randomRGBColor() {
    // Define random RGB color values
    let r = Math.floor(Math.random() * 255 + 1)
    let g = Math.floor(Math.random() * 255 + 1)
    let b = Math.floor(Math.random() * 255 + 1)

    return [r,g,b]
}

function adaptTheme(color) {
    if (checkLightOrDarkRGB(...color) === "light") {
        text.forEach(item => {
            item.classList.add("light")
            item.classList.remove("dark")
        });
    } else {
        text.forEach(item => {
            item.classList.remove("light")
            item.classList.add("dark")
        });
    
    }
}

function displayColorValue(color){
    RValue.value = color[0]
    GValue.value = color[1]
    BValue.value = color[2]
}

function changeBackgroundColor(color) {
    let value = "rgb( " + color.join(" , ") + " )"
    body.style.backgroundColor = value
    adaptTheme(color)
    displayColorValue(color)
}

function randomBG(){
    let color = randomRGBColor()
    changeBackgroundColor(color)
}

randomBG()

btn.addEventListener("click", (e) => {
    e.preventDefault()
    randomBG()
});

RValue.addEventListener('change', () => {
    let color = [RValue.value, GValue.value, BValue.value]
    changeBackgroundColor(color)
})

GValue.addEventListener('change', () => {
    let color = [RValue.value, GValue.value, BValue.value]
    changeBackgroundColor(color)
})

BValue.addEventListener('change', () => {
    let color = [RValue.value, GValue.value, BValue.value]
    changeBackgroundColor(color)
})