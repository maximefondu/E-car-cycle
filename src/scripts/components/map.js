const mapSvg         = document.querySelector('.map__svg')
const numberPosition = document.querySelector('.map__number')
const typePosition   = document.querySelector('.map__type')
const circles        = mapSvg.childNodes
const numberUse      = []

//GetData
fetch(`./public/json/number-car.json`)
.then(response => response.json())
.then(data => {

    data.forEach(element => {
        const pourcent     = element['pourcent']
        const slug         = element['slug']
        const numberCircle = Math.round(pourcent / 100 * circles.length)

        if(slug !== 'all'){
            for (let i = 0; i < numberCircle; i++) {
                const circle = getRandomInt(circles.length)
                circles[circle].setAttribute('data-type', slug)
            }    
        }else{
            const number = getNumber(element['number'])
            const plural = element['plural']
            numberPosition.textContent=number
            typePosition.textContent=`voitures aux ${plural}`
        }

    })

    circles.forEach(circle => { 
        circle.addEventListener('mouseover', (e)=>{
            displayData(data, e)
        })

        circle.addEventListener('mouseout', (e)=>{
            const defaultData = data.find(data => data.id == 7)
            const number = getNumber(defaultData['number'])
            const plural = defaultData['plural']
    
            //TEXT
            numberPosition.textContent = number
            typePosition.textContent = `voitures ${plural}`

            //COLORS
            colorsRemove()
        })
    })

})



//RANDOM INT
function getRandomInt(max){    
    const number = Math.floor(Math.random() * Math.floor(max))

    if(!numberUse.includes(number)){
        numberUse.push(number)
        return number
    }else{
        return getRandomInt(max)
    }
}

//NUMBER 3 SPACES
function getNumber(element){
    const number = new Intl.NumberFormat().format(element)
    return number
}

//DISPLAY COLORS
function colors(slug){
    circles.forEach(circle => { 
        circle.classList.add('disable')

        const currentSlug = circle.getAttribute('data-type')
        if(currentSlug === slug){
            circle.classList.remove('disable')
        }
    })
}

//REMOVE COLORS
function colorsRemove(){
    circles.forEach(circle => {
        circle.classList.remove('disable')
    })
}

//DISPLAY
function displayData(data, e){
    const element        = e.currentTarget
    const slug           = element.getAttribute('data-type')
    const currentData    = data.find(data => data.slug == slug)
    const plural         = currentData["plural"]
    const number         = getNumber(currentData['number'])
    const currentNumber  = numberPosition.textContent
    
    //SI SURVOLE UNE DATA DIFFERENTE
    if(currentNumber !== number){
        //TEXT
        numberPosition.textContent = number
        typePosition.textContent = `voitures ${plural}`

        //COLORS
        colors(slug)
    } 
}