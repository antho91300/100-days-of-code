const slidesItems = [...document.getElementsByClassName('slider-item')]
const navLinks = [...document.getElementsByClassName('nav-btn')]
let index = 0

function changeSlide(direction) {
  if (direction === "prev"){
    if ( index == 0 ){
      index = slidesItems.length - 1
    }else {
      index--
    }
  } else {
    if ( index == slidesItems.length - 1 ){
      index = 0
    }else {
      index++
    }
  }
  slidesItems.forEach(slide => {
    slide.classList.remove('active')
  })
  slidesItems[index].classList.add('active')
}

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault()
    changeSlide(e.target.dataset.action)
  })
});