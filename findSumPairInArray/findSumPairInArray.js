let recursionBreaker = 1000;
let loops = 0;
let frontInd = 0;
// subtract fromTheBackInd from length to get backInd
let fromTheBackInd = 1;
// loop through number[] and find 2 elements that add up to sum
// returns 2 indices of the two elements that add up to sum or [] if none found
const findSumPairInArray = (numArr, sum) => {
    // ! nested loop
    // for (let i = 0; i < numArr.length; i++) {
    //     for (let j = i + 1; j < numArr.length; j++) {
    //         if (numArr[i] + numArr[j] === sum) {
    //             return [numArr[i], numArr[j]]
    //         }
    //     }
    // }
    // ! n*log(n) solution too slow
    // sort ascending
    // numArr.sort((a, b) => a - b)
    // single loop
    const backInd = numArr.length - fromTheBackInd;
    const currentSum = numArr[frontInd] + numArr[backInd];
    if (backInd === frontInd) {
        return [];
    }
    if (currentSum === sum) {
        const foo = [frontInd, backInd];
        return foo;
    }
    else if (loops < recursionBreaker) {
        recursionBreaker++;
        if (currentSum > sum) {
            fromTheBackInd++;
        }
        else if (currentSum < sum) {
            frontInd++;
        }
        return findSumPairInArray(numArr, sum);
    }
};
// const test1 = [1, 2, 3, 9]
// const sum1 = 8
// const test2 = [1, 2, 4, 4]
// const sum2 = 8
// console.log(findSumPairInArray(test1, sum1))
// const result = findSumPairInArray(test2, sum2)
// console.log('result:', result);
//
const test3 = [4, 2, 8, 1, 0, 9, 1, 9, 91, 42, 7];
const sum3 = 8;
const complements = new Set();
const findSumPair = (numArr, sum) => {
    for (let index = 0; index < numArr.length; index++) {
        const number = numArr[index];
        const difference = sum - number;
        if (complements.has(difference)) {
            return true;
        }
        complements.add(difference);
        // const differenceIndex = numArr.indexOf(difference, index + 1);
        // return [index, differenceIndex];
    }
    return false;
};
console.log(findSumPair(test3, sum3));
