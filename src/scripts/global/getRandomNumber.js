//RANDOM INT
const numberUse      = []

export function getRandomInt(max){ 
    
    if(numberUse.length <= max){
        const number = Math.floor(Math.random() * Math.floor(max))

        if(!numberUse.includes(number)){
            numberUse.push(number)
            return number
        }else{
            return getRandomInt(max)
        }
    }

}