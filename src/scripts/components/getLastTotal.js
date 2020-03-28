import { getLastNumber } from './getLastNumber'

//GET TOTAL CAR LAST YEARTH (2019)
export function getLastTotal(data){
    const lastObject = data[data.length - 1]
    const number     = getLastNumber(lastObject)

    return number
}