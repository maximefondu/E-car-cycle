//GET LAST NUMBER OF ARRAY NUMBERS (2019)
export function getLastNumber(data){
    const numbersObj = data['numbers']
    const numbersArray = Object.keys(numbersObj);
    const numberLast = numbersObj[numbersArray[numbersArray.length - 1]]

    return numberLast
}