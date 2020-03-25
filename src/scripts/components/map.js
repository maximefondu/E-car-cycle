const map = document.querySelector('.map')
const circles = map.children
const numberUse = []

//GetData
fetch(`./public/json/number-car.json`)
.then(response => response.json())
.then(data => {

    data.forEach(element => {
        const pourcent = element['pourcent']
        const slug     = element['slug']
        const pointNumber = Math.round(pourcent / 100 * circles.length)

        for (let i = 0; i < pointNumber; i++) {
            const circle = getRandomInt(circles.length)    
            circles[circle].setAttribute('data-type', slug)
        }
    });

})

//RANDOM INT
function getRandomInt(max){    
    const number = Math.floor(Math.random() * Math.floor(max))

    if(!numberUse.includes(number)){
        numberUse.push(number)
        return number
    }else{
        return getRandomInt(max)
        console.log('ELSE');
        
    }
}

