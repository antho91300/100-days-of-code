const btn = document.getElementById("btn")
const body = document.getElementById("body")
const text = [...document.getElementsByClassName("theme")]
const colorValue = document.getElementById("color")

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

function displayColorValue( r, g, b){

}

function changeBackgroundColor() {
    let color = randomRGBColor()
    let value = "rgb( " + color.join(" , ") + " )"
    body.style.backgroundColor = value
    adaptTheme(color)
    colorValue.innerHTML = value
}

changeBackgroundColor()

btn.addEventListener("click", (e) => {
    e.preventDefault()
    changeBackgroundColor()
});