/*
    A “word square” is an ordered sequence of K different words of length K that, when written one word per line, reads the same horizontally and vertically

    BALL
    AREA
    LEAD
    LADY

    POP
    OPA
    PAP
    
    ! design a way to return true if a given sequence of words is a word square
    ! given an arbitrary list of words, return all the possible word squares it contains. Reordering is allowed
*/

type WordInfo = {
    wordInd: number,
    word: string,
    possibleInds: Set<number>,
}

type WordRecord = {
    firstLtrs: Record<string, number[]>,
    wordsInfo: WordInfo[],
    words: string[]
}

class WordSquares {
    currentWR: WordRecord
    testWordSq: string[] = []

    constructor(public allWords: string[]) {
        const recordsSetup = this.setupRecords(allWords)
        if (recordsSetup) {
            this.populatePossibleInds()
            this.checkCurrentWR()
        }
    }


    // returns false when words is NOT a wordSquare
    setupRecords(words: string[]): boolean {
        const firstLetters: Record<string, number[]> = {}; // <letter, wordInds>
        const wordsInfo: WordInfo[] = [];
        for (let wordInd = 0; wordInd < words.length; wordInd++) {
            const word = words[wordInd];
            if (word.length !== words.length) {
                // if the length of the array is not equal to each word length, return false
                return false;
            }
            const firstLetter = word[0];
            if (!firstLetters[firstLetter]) {
                firstLetters[firstLetter] = [wordInd];
            } else {
                firstLetters[firstLetter].push(wordInd);
            }
            wordsInfo[wordInd] = {
                wordInd: wordInd,
                word: word,
                possibleInds: new Set([0])
            }
        }
        this.currentWR = {
            firstLtrs: firstLetters,
            wordsInfo: wordsInfo,
            words: words
        }
        return true
    }

    populatePossibleInds() {
        for (let wordInd = 0; wordInd < this.currentWR.words.length; wordInd++) {
            const word = this.currentWR.words[wordInd]
            // wordSqaures can be 2x2, 3x3, 4x4, 5x5, etc.
            for (let letterInd = 1; letterInd < word.length; letterInd++) {
                const letter = word[letterInd];
                if (this.currentWR.firstLtrs[letter]) {
                    this.currentWR.firstLtrs[letter].forEach((wordIndex) => {
                        // all words beginning with letter need letterInd added to their possibleInds
                        this.currentWR.wordsInfo[wordIndex].possibleInds.add(letterInd);
                    })
                }
            }
        }
        this.currentWR.wordsInfo.sort((a, b) => {
            return a.possibleInds.size - b.possibleInds.size;
        })
    }

    checkCurrentWR() {
        let wordFits = false
        for (let i = 0; i < this.currentWR.wordsInfo.length; i++) {
            const wordInfo = this.currentWR.wordsInfo[i];
            wordFits = this.checkWordAtPossibleIndex(wordInfo);
            if (wordFits) {
                break;
            }
        }
        if (!wordFits) {
            console.log(this.currentWR.words, 'is NOT a wordsquare');
        }
        // reset currentWR and testWordSquare
        this.currentWR = {
            firstLtrs: {},
            wordsInfo: [],
            words: []
        };
        this.testWordSq = [];
    }

    checkWordAtPossibleIndex(wordInfo: WordInfo) {
        const possInds = [...wordInfo.possibleInds];
        for (let index = 0; index < possInds.length; index++) {
            const possibleInd = possInds[index];
            // const usedInds: number[] = [];

            this.testWordSq[possibleInd] = wordInfo.word;
            // usedInds.push(possibleInd);

            for (let letterInd = 0; letterInd < wordInfo.word.length; letterInd++) {
                const letter = wordInfo.word[letterInd];

                // if only one word has this first letter, set to testWordSquare
                if (!this.currentWR.firstLtrs[letter]) {
                    return false;
                } else if (this.currentWR.firstLtrs[letter].length === 1) {
                    const matchedInd = this.currentWR.firstLtrs[letter][0];
                    const wordToTry = this.currentWR.words[matchedInd];
                    this.testWordSq[letterInd] = wordToTry;
                } else {
                    // if more than 1 word has same first letter, loop through the array
                    for (let firstLtrMatch = 0; firstLtrMatch < this.currentWR.firstLtrs[letter].length; firstLtrMatch++) {
                        const matchedInd = this.currentWR.firstLtrs[letter][firstLtrMatch];
                        const possibleWord = this.currentWR.words[matchedInd];

                        for (let testSqInd = 1; testSqInd < this.testWordSq.length; testSqInd++) {
                            const testWord = this.testWordSq[testSqInd];
                            if (possibleWord[testSqInd] === testWord[letterInd]) {
                                this.testWordSq[letterInd] = possibleWord;
                                if (this.testWordSq.length === this.currentWR.words.length) {
                                    console.log(this.currentWR.words, 'IS a wordsquare');
                                    return true
                                }
                            }
                        }
                    }
                }
            }
        }
        return false;
    }
}


// ! pass case 1
// const words1 = ['LADY', 'BALL', 'AREA', 'LEAD']
// BALL
// AREA
// LEAD
// LADY

// inds.BALL = [0]
// inds.LADY = [0, 2, 3]
// inds.LEAD = [0, 2, 3]
// inds.AREA = [0, 1, 2, 3]

const words1 = ['LADY', 'BALL', 'AREA', 'LEAD']
new WordSquares(words1)


// ! pass case 2
// words = [OPA, POP, PAP]
// POP
// OPA
// PAP
// inds.OPA = [0, 1] 
// inds.POP = [0, 1, 2]
// inds.PAP = [0, 1, 2]

// ! first try OPA as [0]
// usedInds = [0]
// letterInd = 1, 'P' -> this.firstLetters['P'], [1, 2] ->
// words[1], POP
// letterInd = 2, 'A' -> this.firstLetters['A'], [] -? Fail


// ! first try POP as [0]
// usedInds = [1]
// letterInd = 1, 'O' -> this.firstLetters['O'], [0]
// words[1], OPA
// letterInd = 2, 'P' -> this.firstLetters['P'], [1, 2] -> filter usedInds -> [2]
// words[2], PAP

const words2 = ['OPA', 'POP', 'PAP']
new WordSquares(words2)


// POP -> first char P. remove POP from words to check
// O -> firstchar of OPA
// P -> first char of PAP

// OPA
// P -> 2nd char of OPA
// A -> 2nd char of PAP. remove OPA from words to check

// PAP
// A -> 3rd char of OPA
// P -> 3rd char of PAP. return true

// ! fail Case
const words3 = ['OPA', 'POD', 'PAP']
new WordSquares(words3)