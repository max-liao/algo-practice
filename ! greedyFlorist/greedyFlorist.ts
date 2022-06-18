
// splice removes items from array, slice just takes a subset of the array
const testArr = ['100 78', '692261 48553 549680 661623 274985 142762 235623 43717 568519 285863 64114 529201 429801 426630 261332 744012 165142 60667 585075 437392 172545 145521 426548 860002 44348 403475 129090 678438 471882 357431 597870 980287 400657 991847 787760 686306 959534 816910 315660 554005 215651 970172 29456 607498 833260 259798 45242 391762 247919 288669 437366 207872 894609 80217 17796 502235 821413 167777 876792 408894 310399 665738 802203 416528 178599 973866 195567 136668 629609 143047 412752 849676 150793 570593 307894 820743 639060 318873 609303 146660 591954 949437 634025 136265 350808 81329 819397 14821 429050 453627 457191 194502 421917 258922 282770 978967 603178 701412 481105 313722']
const testArr2 = ['3 3', '2 5 6'] // should return  5 + 6 + 2 = 13
const testArr3 = ['3 2', '2 5 6'] // should return  14 + 6 + 5 + 3 = 15
const testArr4 = ['4 3', '2 5 6 14'] // should return  4 + 5 + 6 + 14 = 29

function greedyFlorist(testArr: string[]) {
    const [foo, numPeople] = testArr[0].split(' ').map(Number);
    const numArr = testArr[1].split(' ').map(Number).sort((a, b) => a - b);
    const numFlowers = numArr.length;

    const getSum = (acc: number, curr: number): number => acc + curr;
    const originalSum = numArr.reduce(getSum, 0)
    let moneySpent = originalSum;
    if (numFlowers <= numPeople) {
        console.log(originalSum);
        return
    } else {















        // const numLoops = Math.floor(numFlowers / numPeople) + 1;
        // const leftoverFlowers = numFlowers % numPeople;

        // console.log('numLoops:', numLoops);












        // console.log('leftoverFlowers:', leftoverFlowers);

        // // moneySpent += numPeople * numLoops + leftoverFlowers * (numLoops + 1);
        // for (let i = 0; i < numLoops; i++) {
        //     numArr.splice(i, numPeople).forEach(
        //         (curr, currInd) => {
        //             // take most expensive first that's 1x
        //             // const numToAdd = (numLoops - currInd) * curr
        //             console.log('curr:', curr);
        //             console.log('currInd:', currInd);
        //             // console.log('numToAdd:', numToAdd);
        //         });
        //     // backInd -= numPeople;
        // }
        // // if there are leftover flowers, add them to the moneySpent
        // if (leftoverFlowers > 0) {
        //     // moneySpent += numArr.reduce(getSum, 0)
        // }
        // console.log(moneySpent);
    }
}

// greedyFlorist(testArr)
// greedyFlorist(testArr2)
// greedyFlorist(testArr3)
greedyFlorist(testArr4)