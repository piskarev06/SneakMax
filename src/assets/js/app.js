const noUiSlider = require('./nouislider.min.js')

const iconMenu = document.querySelector('.header__icon')
const menuBody = document.querySelector('.header__menu')
if (iconMenu) {
  iconMenu.addEventListener('click', function (e) {
    document.body.classList.toggle('_lock')
    iconMenu.classList.toggle('_active')
    menuBody.classList.toggle('_active')
  })
}
// End of Burger

const menuLinks = document.querySelectorAll('.scroll[data-goto]')
if (menuLinks.length > 0) {
  menuLinks.forEach((el) => {
    el.addEventListener('click', onMenuLinkClick)
  })

  function onMenuLinkClick(e) {
    const menuLink = e.target
    if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto)
      const gotoBlockValue =
        gotoBlock.getBoundingClientRect().top +
        pageYOffset -
        document.querySelector('header').offsetHeight

      if (iconMenu.classList.contains('_active')) {
        document.body.classList.remove('_lock')
        iconMenu.classList.remove('_active')
        menuBody.classList.remove('_active')
      }

      window.scrollTo({
        top: gotoBlockValue,
        behavior: 'smooth',
      })
      e.preventDefault()
    }
  }
}
// End of NavScroll

const accordions = document.querySelectorAll('.faq-accordion')

accordions.forEach((el) => {
  el.addEventListener('click', (e) => {
    const self = e.currentTarget
    const control = self.querySelector('.faq-accordion__control')
    const content = self.querySelector('.faq-accordion__content')

    self.classList.toggle('open')

    if (self.classList.contains('open')) {
      control.setAttribute('aria-expanded', true)
      content.setAttribute('aria-hidden', false)
      content.style.maxHeight = content.scrollHeight + 'px'
    } else {
      control.setAttribute('aria-expanded', false)
      content.setAttribute('aria-hidden', true)
      content.style.maxHeight = null
    }
  })
})
// End of Faq

ymaps.ready(init)
function init() {
  const myMap = new ymaps.Map('map', {
    center: [59.830481, 30.142197],
    zoom: 14,
  })

  place = new ymaps.Placemark([59.830481, 30.142197])
  myMap.geoObjects.add(place)
}
// End of Map

const btns = document.querySelectorAll('.modal-btn')
const modalOverlay = document.querySelector('.modal-overlay')
const modals = document.querySelectorAll('.modal')

btns.forEach((el) => {
  el.addEventListener('click', (e) => {
    let path = e.currentTarget.getAttribute('data-path')

    modals.forEach((el) => {
      el.classList.remove('modal--visible')
    })

    document.querySelector(`[data-target="${path}"]`).classList.add('modal--visible')
    modalOverlay.classList.add('modal-overlay--visible')
    document.body.classList.add('_lock')
  })
})

modalOverlay.addEventListener('click', (e) => {
  console.log(e.target)

  if (e.target == modalOverlay) {
    modalOverlay.classList.remove('modal-overlay--visible')
    document.body.classList.remove('_lock')
    modals.forEach((el) => {
      el.classList.remove('modal--visible')
    })
  }
})

// End Of Modal

const controlSlider = new Swiper('.modal-good__slider', {
  direction: 'horizontal',
  loop: false,
  spaceBetween: 20,
  slidesPerView: 6,
})

const heroSlider = new Swiper('.modal-good__slider-2', {
  direction: 'horizontal',
  loop: false,
  spaceBetween: 20,
  slidesPerView: 1,

  thumbs: {
    swiper: {
      el: '.modal-good__slider',
      slidesPerView: 6,
      spaceBetween: 20,

      breakpoints: {
        320: {
          spaceBetween: 10,
        },
        480: {
          spaceBetween: 15,
        },
      },
    },
  },
})
// End Of Slider

function scrollTo(el) {
  window.scroll({
    left: 0,
    top: el.offsetTop + pageYOffset - document.querySelector('header').offsetHeight,
    behavior: 'smooth',
  })
}

let button = document.querySelector('.intro__btn')
let catalog = document.querySelector('.catalog')

button.addEventListener('click', () => {
  scrollTo(catalog)
})
// End Of Scroll

const rangeSlider = document.getElementById('range-slider')

if (rangeSlider) {
  noUiSlider.create(rangeSlider, {
    start: [500, 100000],
    connect: true,
    step: 1,
    range: {
      min: [500],
      max: [100000],
    },
  })

  const input0 = document.getElementById('input-0')
  const input1 = document.getElementById('input-1')
  const inputs = [input0, input1]

  rangeSlider.noUiSlider.on('update', function (values, handle) {
    inputs[handle].value = Math.round(values[handle])
  })

  const setRangeSlider = (i, value) => {
    let arr = [null, null]
    arr[i] = value

    rangeSlider.noUiSlider.set(arr)
  }

  inputs.forEach((el, index) => {
    el.addEventListener('change', (e) => {
      setRangeSlider(index, e.currentTarget.value)
    })
  })
}
// End Of Range
