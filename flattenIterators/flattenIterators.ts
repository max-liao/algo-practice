// https://techdevguide.withgoogle.com/paths/interview/
// https://techdevguide.withgoogle.com/resources/former-interview-question-flatten-iterators/#!

const arr1 = [1, 2, 3];
const arr2 = [4, 5];
const arr3 = [6, 7, 8, 9];
// Iterator < Integer > a = arr1.iterator();
// Iterator < Integer > b = arr2.iterator();
// Iterator < Integer > c = arr3.iterator();
// Iterator < Integer > [] iterlist = [a, b, c];

class IteratorFlattener {

    currentInd = 0
    arrInd = 0
    indOfSubarr = 0
    combinedArrLen = 0

    constructor(public arrays: number[][]) {
        this.combinedArrLen = arrays.reduce((acc, curr) => acc + curr.length, 0);
        while (this.hasNext()) {
            this.next();
        }
        this.currentInd = 0
    }

    public next() {
        if (this.arrays[this.arrInd][this.indOfSubarr]) {
            console.log(this.arrays[this.arrInd][this.indOfSubarr])
        } else {
            this.arrInd++
            this.next()
        }
        this.arrInd++
        if (this.arrInd > (this.arrays.length - 1)) {
            this.arrInd = 0
            this.indOfSubarr++
        }
        this.currentInd++
    }

    public hasNext(): boolean {
        return this.currentInd < (this.combinedArrLen + 1)
    }
}

new IteratorFlattener([arr1, arr2, arr3])