// https://techdevguide.withgoogle.com/resources/former-interview-question-compression-and-decompression/#!


// 2 -> [, is number, grab rest of number (look for '['), and add to multiplier stack
// [ -> 1, is left bracket, begin constructedStringsArr
// ! constructedStringsArr consists of strings that need to be multiplied
// nextInd is number, grab rest of number (look for '['), and add to multiplier stack
// 10 -> [, nextInd is left bracket
// [ -> a, nextInd is char, grab rest of string (look for '[' or ']'). 'a'
// if ']', pop from multiplier stack (10), run repeat, add to constructedStringsArr. 'aaaaaaaaaa'
// if '[', jump index to next ']' and do nothing
// a -> ], nextInd is right bracket, begin constructedStringsArr. ['aaaaaaaaaa']
// 'a'] -> b, nextInd is char, grab rest of string (look for '[' or ']'). 'b'
// b -> ], nextInd is right bracket, 
// pop from multiplier stack (2), add to constructedStringsArr. ['aaaaaaaaaa', 'b']
// join constructedStringsArr. 'aaaaaaaaaab', run repeat. 'aaaaaaaaaabaaaaaaaaaab'
// ] -> 0, is number, grab rest of number (look for '['), and add to multiplier stack
// 0 -> [, nextInd is left bracket. number <= 0, skip to next ']'
// [ -> ], do nothing
// ] -> a, nextInd is char, grab rest of string (look for '[' or ']'). 'a'
// a -> [, nextInd is right bracket, but current is string -> add directly to output. 'aaaaaaaaaabaaaaaaaaaaba'
// skip to next ']'
// ] -> b, nextInd is char, grab rest of string (look for '[' or ']'). 'b'
// b -> end. Add directly to output. 'aaaaaaaaaabaaaaaaaaaabab'


class DecompressString {
    constructor(public string: string) {
        this.incrementEntry()
        console.log(this.output)
    }
    output = ''
    currentIndex = 0
    currentString = ''
    currentNumStr = ''
    multipliers: number[] = []
    stringsToAdd: string[] = []

    isNumeric(value) {
        return /^-?\d+$/.test(value)
    }
    isLetter(str) {
        return str.toLowerCase() != str.toUpperCase();
    }

    // ! One repetition can occur inside another. For example, 2[3[a]b] decompresses into aaabaaab
    // ! 2[4[a]3[b]] decompresses into aaaabbbaaaabbb
    incrementEntry() {
        if (this.currentIndex < this.string.length) {
            // const hasMultiplier = this.multipliers.length > 0
            // const previousElement = this.string[this.currentIndex - 1]
            const currElement = this.string[this.currentIndex]
            const nextElement = this.string[this.currentIndex + 1]
            if (this.isNumeric(currElement)) {
                // begin constructedNumber
                this.currentNumStr += currElement
                // look for rest of number(ends at '['),
                if (nextElement === '[') {
                    // end of number - add to multiplier stack
                    const multiplierToAdd = Number(this.currentNumStr)
                    this.multipliers.push(multiplierToAdd)
                    this.currentNumStr = ''
                }
            } else if (this.isLetter(currElement)) {
                this.currentString += currElement
                if (nextElement === '[') {
                    this.currentIndex = this.string.indexOf(']', this.currentIndex)
                }
            } else if (currElement === ']') {
                if (this.currentString.length || this.stringsToAdd.length) {
                    const multiplier = this.multipliers.pop() as number
                    if (this.multipliers.length > 0) {
                        this.stringsToAdd.push(this.currentString.repeat(multiplier))
                    } else {
                        this.stringsToAdd.push(this.currentString)
                        this.output += [...this.stringsToAdd].join('').repeat(multiplier)
                        this.stringsToAdd = []
                    }
                    this.currentString = ''
                }
            }
            this.currentIndex++
            if (this.currentIndex < this.string.length) {
                this.incrementEntry()
            } else {
                this.output += this.currentString
            }

            return
        }
    }

    getSubstring() {
        const endInd = this.string.indexOf(']', this.currentIndex)
        this.currentIndex = endInd - 1
        return this.string.substring(this.currentIndex, endInd)
    }
}

const input1 = '2[3[a]b]' // decompresses into aaabaaab
const input2 = '2[3[a]4[b]]' // decompresses into aaabbbbaaabbbb
const input3 = 'a[]b'
const input4 = '2[10[a]b]0[abc]a[]b'
const input5 = '2[3[a]4[b]b]' // decompresses into aaabbbbaaabbbb
// new DecompressString(input1)
// new DecompressString(input2)
// new DecompressString(input3)
// new DecompressString(input4)
new DecompressString(input5)