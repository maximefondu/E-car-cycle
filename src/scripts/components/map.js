import { getLastNumber } from './getLastNumber'
import { getLastTotal } from './getLastTotal'
import { getRandomInt } from './../global/getRandomNumber'
import { getPourcent } from './../global/getPourcent'

const mapSvg      = document.querySelector('.map__svg')
const contentData = document.querySelector('.map__content')
const circles     = mapSvg.childNodes

fetch(`./public/json/number-car.json`)
.then(response => response.json())
.then(data => {

    const totalLast  = getLastTotal(data)

    data.forEach(data => {
        const view = data['view']
        if(view){
            const number   = getLastNumber(data)
            const pourcent = getPourcent(number, totalLast)

            colorCircle(pourcent, data)
        }        
    })

    circles.forEach(circle =>{
        circle.addEventListener('mouseover', (e)=>{
            removeText()
            disableCircle(e)
            createPourcent(e, data, totalLast)
            createName(e, data)
        })
    
        circle.addEventListener('mouseleave', (e)=>{
            //REMOVE DISABLE
            circles.forEach(circle => {
                circle.classList.remove('disable')
            })
        })
        
    })

})





//–––––––––––––––––– FUNCTIONS ––––––––––––––––––


//COLOR CIRLCE
function colorCircle(pourcent, data){
    const numberCirclesColor = Math.round(pourcent / 100 * circles.length)
    const slug = data["slug"]

    for (let i = 0; i < numberCirclesColor; i++) {
        const circle = getRandomInt(circles.length)
        circles[circle].setAttribute('data-type', slug)
    } 
}

//REMOVE TEXT
function removeText(){
    const text = document.querySelector('.map__text')
    text.classList.add('map__text--disable')
}

//HOVER ELEMENT SELECTED
function disableCircle(e){
    const slug = e.currentTarget.getAttribute('data-type')
    circles.forEach(circle => {
        const currentSlug = circle.getAttribute('data-type')

        if(currentSlug !== slug){
            circle.classList.add('disable')
        }
    });
}

//CREATE POURCENT
function createPourcent(e, data, totalLast){
    removeElement('map__pourcent')
    const currentSlug = e.currentTarget.getAttribute('data-type')
    const currentData = data.find(data => data.slug == currentSlug)
    const number = getLastNumber(currentData)
    const pourcent = getPourcent(number, totalLast)
    const pourcentRound = Math.ceil(pourcent)

    const span = document.createElement('span')
    span.classList.add('map__pourcent')
    span.textContent = `${pourcentRound}%`
    contentData.append(span)
}

//CREATE NAME
function createName(e, data){
    removeElement('map__name')
    const currentSlug = e.currentTarget.getAttribute('data-type')
    const currentData = data.find(data => data.slug == currentSlug)
    const name = currentData['plural']

    const h2 = document.createElement('h2')
    h2.classList.add('map__name')
    h2.textContent = `de voiture ${name}`
    contentData.append(h2)
}

//REMOVE ELEMENT
function removeElement(classe){
    const element = document.querySelector(`.${classe}`)
    if(element){
        element.remove()
    }
}