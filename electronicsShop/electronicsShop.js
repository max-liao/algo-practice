const input1 = ['10 2 3', '3 1', '5 2 8'];
const input2 = ['5 1 1', '4', '5'];
function electronicsShop(input) {
    const budget = parseInt(input[0].split(' ')[0]);
    const keyboardPrices = input[1].split(' ').map(Number);
    const drivePrices = input[2].split(' ').map(Number);
    // ! log most expensive combination of keyboard/mouse under budget
    // other combos can be discarded
    // sort keyboards/drives by price descending
    const sortDesc = (a, b) => b - a;
    keyboardPrices.sort(sortDesc);
    drivePrices.sort(sortDesc);
    // ! brute force combined array containing sums of keyboards/drives must loop through both arrays
    // filter keyboards/drives combos over budget
    // find most expensive unit
    const keyboardMostExpensive = keyboardPrices[0] > drivePrices[0];
    if (keyboardMostExpensive) {
        // check most expensive keyboard under budget and most expensive drive under budget
        for (let i = 0; i < keyboardPrices.length; i++) {
            const keyboardPrice = keyboardPrices[i];
            for (let j = 0; j < drivePrices.length; j++) {
                const drivePrice = drivePrices[j];
                if (keyboardPrice + drivePrice <= budget) {
                    console.log(keyboardPrice + drivePrice);
                    return;
                }
            }
        }
    }
    else {
        for (let j = 0; j < drivePrices.length; j++) {
            const drivePrice = drivePrices[j];
            for (let i = 0; i < keyboardPrices.length; i++) {
                const keyboardPrice = keyboardPrices[i];
                if (keyboardPrice + drivePrice <= budget) {
                    console.log(keyboardPrice + drivePrice);
                    return;
                }
            }
        }
    }
    // if their sum is over budget, take the less expensive of the 2 and decrement the index
    // break loop if the combined price is less than budget
    // ? combine keyboard + drive prices without nested loop?
}
electronicsShop(input1);
// electronicsShop(input2)
