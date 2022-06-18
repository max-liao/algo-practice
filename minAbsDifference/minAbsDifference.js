/*
 * Complete the 'minimumAbsoluteDifference' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY arr as parameter.
 */
const foo = [
];
function minimumAbsoluteDifference(arr) {
    let equal = false;
    // sort the array
    arr.sort((a, b) => {
        if (a === b) {
            equal = true;
            return 0;
        }
        else {
            return a - b;
        }
    });
    if (equal) {
        return 0;
    }
    // loop through the array getting absolute difference between each pair of numbers
    const diffs = arr.map((num, index) => {
        // skip last element
        if (index === arr.length - 1) {
            return null;
        }
        else {
            return Math.abs(num - arr[index + 1]);
        }
    }).filter(num => num);
    const minAbsDiff = Math.min(...diffs);
    console.log('minAbsDiff:', minAbsDiff);
    return minAbsDiff;
}
minimumAbsoluteDifference(foo);