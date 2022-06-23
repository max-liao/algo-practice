export function binarySearch(arr, val) {
    let start = 0;
    let end = arr.length - 1;

    while (start <= end) {
        let mid = Math.floor((start + end) / 2);

        // matched
        if (arr[mid] === val) {
            return mid;
        }

        if (val < arr[mid]) {
            // is in first half of array
            end = mid - 1;
        } else {
            // is in 2nd half of array
            start = mid + 1;
        }
    }
    return -1;
}

const arr1 = [2, 3, 4, 7, 8, 9, 11, 14]
console.log(binarySearch(arr1, 11))