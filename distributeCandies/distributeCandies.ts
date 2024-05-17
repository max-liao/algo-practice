const input1 = [1, 1, 2, 2, 3, 3]; // expected output = 3
const candyType = [1, 1, 2, 3]; // expected = 2
const candyType2 = [6, 6, 6, 6]; // expected = 1


function distributeCandies(candyType: number[] = []): number {
    // ! length of array is always even
    const candiesAllowed = candyType.length / 2;

    const candyTypeMap = new Map<number, number>() // <candyType, candyTypeCount>

    for (let i = 0; i < candyType.length; i++) {
        const candy = candyType[i];
        const typeExists = candyTypeMap.get(candy) as number;
        candyTypeMap.set(candy, isNaN(typeExists) ? 1 : typeExists + 1);
    }

    return candyTypeMap.size > candiesAllowed ? candiesAllowed : candyTypeMap.size;
};
console.log(distributeCandies(input1))
console.log(distributeCandies(candyType))
console.log(distributeCandies(candyType2))