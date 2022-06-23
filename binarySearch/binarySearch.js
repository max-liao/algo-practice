function binarySearch(arr, val) {
    let start = 0;
    let end = arr.length - 1;
    while (start <= end) {
        let mid = Math.floor((start + end) / 2);
        if (arr[mid] === val) {
            return mid;
        }
        if (val < arr[mid]) {
            end = mid - 1;
        }
        else {
            start = mid + 1;
        }
    }
    return -1;
}
const arr1 = [2, 3, 4, 7, 8, 9, 11, 14];
console.log(binarySearch(arr1, 11));
