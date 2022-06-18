class DecompressString {
    constructor(public string: string) {
        this.incrementEntry()
        console.log(this.output)
    }
    output = ''
    currentIndex = 0
    multipliers: number[] = []
    stringsToAdd: string[] = []
    buildString = ''

    isNumeric(value) {
        return /^-?\d+$/.test(value)
    }

    incrementEntry() {
        if (this.currentIndex >= this.string.length) {
            return
        }
        // ! One repetition can occur inside another. For example, 2[3[a]b] decompresses into aaabaaab
        // ! 2[4[a]3[b]] decompresses into aaaabbbaaaabbb

        const hasMultiplier = this.multipliers.length > 0
        const currElement = this.string[this.currentIndex]
        if (this.isNumeric(currElement)) {
            const newMultiplier = Number(currElement)
            this.multipliers.push(newMultiplier)
            // skip the '['
            this.currentIndex++
        } else if (currElement === ']') {
            if (this.buildString.length > 0 && hasMultiplier) {
                const multiplier = this.multipliers.pop() as number
                this.stringsToAdd.push(this.buildString.repeat(multiplier))
                this.buildString = ''
            } else if (this.stringsToAdd.length) {
                const multiplier = this.multipliers.pop() as number
                this.output += [...this.stringsToAdd].join('').repeat(multiplier)
                this.stringsToAdd = []
            }
        } else {
            // ! currElement is letter
            // check if we just entered a bracket
            if (this.string[this.currentIndex - 1] === '[') {
                this.buildString = this.getSubstring()
            } else {
                this.stringsToAdd.push(currElement, this.buildString)
            }
        }
        this.currentIndex++
        this.incrementEntry()
    }

    getSubstring() {
        const endInd = this.string.indexOf(']', this.currentIndex)
        this.currentIndex = endInd - 1
        return this.string.substring(this.currentIndex, endInd)
    }
}
const input1 = '2[3[a]b]' // decompresses into aaabaaab
const input2 = '2[3[a]4[b]]' // decompresses into aaabbbbaaabbbb
new DecompressString(input1)
new DecompressString(input2)
