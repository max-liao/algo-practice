// Examples:
//     asd "dew sed" fgh -> asd, "dew sed", fgh
//     as"d "ew -> as"d "ew
//     asd dew -> asd, dew
//     as"d ew -> as"d, ew

const input0 = `asd "dew sed" fgh`
const answer0 = ['asd', `"dew sed"`, 'fgh']
const input1 = `as"d "ew`
const answer1 = [`as"d "ew`]
const input2 = 'asd dew'
const answer2 = ['asd', `dew`]
const input3 = `as"d ew`
const answer3 = ['as"d', `ew`]
const input4 = `a s"d ew`
const answer4 = ['a', 's"d', `ew`]
const input5 = `as"d ew cowabunga`
const answer5 = ['as"d', 'ew', 'cowabunga']


// split string by spaces
// won't split on spaces inside quotes " "
function splitStringBySpaces(inputString: string, answer: string[]): string[] {
    // loop through string look for quotes
    // if no quotes just run .split(' ')
    let returnStrings: string[] = []
    const doubleQuote = '"'
    const spaceString = ' '

    let leftBound = 0
    let quoteNeedsPair = false
    let lastSpacesOnRight: number[] = []

    const pushSubstring = (index) => {
        returnStrings.push(inputString.substring(leftBound, index))
        leftBound = index + 1 // ?
    }

    // if space found before leftQuoteNeedsPair
    for (let i = 0; i < inputString.length; i++) {
        const char = inputString[i]
        if (char === doubleQuote) {
            // " found
            if (quoteNeedsPair) {
                // clear spaces if matching quotes found (not at end)
                lastSpacesOnRight = []
            }
            quoteNeedsPair = quoteNeedsPair ? false : true
        } else if (char === spaceString) {
            // space found
            if (!quoteNeedsPair) {
                pushSubstring(i)
            } else {
                lastSpacesOnRight.push(i)
            }
        }
    }

    if (lastSpacesOnRight.length) {
        const finalTokensOnRight = inputString.substring(leftBound).split(spaceString)
        // console.log('finalTokensOnRight:', finalTokensOnRight);
        returnStrings = returnStrings.concat(...finalTokensOnRight)
    } else {
        // Handle ending
        pushSubstring(inputString.length)
    }

    const testCasePassed = answer.every((string, ind) => string === returnStrings[ind])
    console.log(testCasePassed, returnStrings)
    return returnStrings
}

splitStringBySpaces(input0, answer0)
splitStringBySpaces(input1, answer1)
splitStringBySpaces(input2, answer2)
splitStringBySpaces(input3, answer3)
splitStringBySpaces(input4, answer4)
splitStringBySpaces(input5, answer5)