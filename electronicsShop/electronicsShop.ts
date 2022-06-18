const input1 = ['10 2 3', '3 1', '5 2 8']
const input2 = ['5 1 1', '4', '5']

function electronicsShop(input: string[]) {
    const budget = parseInt(input[0].split(' ')[0])
    const keyboardPrices = input[1].split(' ').map(Number)
    const drivePrices = input[2].split(' ').map(Number)

    // ! log most expensive combination of keyboard/mouse under budget
    // other combos can be discarded

    // ! brute force combined array containing sums of keyboards/drives must loop through both arrays
    let maxComboPrice = -1;
    for (let i = 0; i < keyboardPrices.length; i++) {
        const keyboardPrice = keyboardPrices[i];
        for (let j = 0; j < drivePrices.length; j++) {
            const drivePrice = drivePrices[j];
            const comboPrice = keyboardPrice + drivePrice;
            if (comboPrice <= budget && comboPrice > maxComboPrice) {
                maxComboPrice = comboPrice;
            }
        }
    }
    console.log(maxComboPrice)

    // ? combine keyboard + drive prices without nested loop?
}

electronicsShop(input1)
// electronicsShop(input2)