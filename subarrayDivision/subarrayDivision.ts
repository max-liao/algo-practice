const s = [1, 2, 1, 3, 2]
const d = 3
const m = 2


// s is chocolate bar arr, d is birthdate, m is month
function birthday(s: number[], d: number, m: number): number {
    let count = 0;
    // increment count when the length of the segment matches Ron's birth month, m
    // const subarrays: number[][] = [];
    // ! make contiguous subarrays with length of m
    for (let i = 0; i < s.length; i++) {
        const endIndex = m + i;
        if (endIndex > s.length) {
            break;
        } else {
            const subarray = s.slice(i, endIndex);
            // and the sum of the integers on the squares is equal to his birth day, d
            // ! sum of subarray must be equal to d to increment count
            if (subarray.reduce((acc, curr) => acc + curr, 0) === d) {
                count++;
            }
        }
    }
    // Determine how many ways she can divide the chocolate.
    return count;
}

birthday(s, d, m)