/*
 * Complete the 'bonAppetit' function below.
 *
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY bill
 *  2. INTEGER k
 *  3. INTEGER b
 */

function bonAppetit(bill: number[], itemSkippedInd: number, bCharged: number): void {
    const bActual = bill.reduce((acc, curr, currInd) => {
        return itemSkippedInd === currInd ? acc : acc += curr;
    }, 0) / 2;

    // Brian did not overcharge 
    bActual === bCharged ? console.log('Bon Appetit') : console.log(bCharged - bActual);
}

const ind2 = 1
const bill2 = [3, 10, 2, 9]
const aContribution2 = 12
bonAppetit(bill2, ind2, aContribution2)