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
    possibleInds: Set<number>
}

type WordRecord = {
    firstLtrs: Record<string, number[]>,
    wordsInfo: WordInfo[],
    words: string[]
}

class WordSquares {
    currentWR: WordRecord
    testWordSquare: string[] = []

    constructor(public allWords: string[]) {
        const recordsSetup = this.setupRecords(allWords)
        if (recordsSetup) {
            this.populatePossibleInds()
            this.isWordSquare()
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

    isWordSquare() {
        // const usedInds: number[] = []
        for (let i = 0; i < this.currentWR.wordsInfo.length; i++) {
            const wordInfo = this.currentWR.wordsInfo[i];
            const wordFits = this.checkWordFitsInSquare(wordInfo);
            if (wordFits) {
                break;
            }
        }
        // reset currentWR and testWordSquare
        this.currentWR = {
            firstLtrs: {},
            wordsInfo: [],
            words: []
        }
        this.testWordSquare = []
    }

    checkWordFitsInSquare(wordInfo: WordInfo) {
        if (wordInfo.possibleInds.size === 1) {
            const onePositionWordInd: number = wordInfo.possibleInds.values().next().value;
            this.testWordSquare[onePositionWordInd] = wordInfo.word;

            for (let letterInd = 0; letterInd < wordInfo.word.length; letterInd++) {
                const letter = wordInfo.word[letterInd];

                // skip onePositionWordInd as the word has been placed there
                if (letterInd !== onePositionWordInd) {
                    // look for letter in firstLetters
                    if (this.currentWR.firstLtrs[letter].length === 1) {
                        const matchedInd = this.currentWR.firstLtrs[letter][0];
                        const wordToTry = this.currentWR.words[matchedInd];
                        this.testWordSquare[letterInd] = wordToTry;
                    } else {
                        // if more than 1 word has same first letter, loop through the array
                        for (let firstLtrMatch = 0; firstLtrMatch < this.currentWR.firstLtrs[letter].length; firstLtrMatch++) {
                            const matchedInd = this.currentWR.firstLtrs[letter][firstLtrMatch];
                            const possibleWord = this.currentWR.words[matchedInd];

                            for (let testSqInd = 1; testSqInd < this.testWordSquare.length; testSqInd++) {
                                const testWord = this.testWordSquare[testSqInd];
                                if (possibleWord[testSqInd] === testWord[letterInd]) {
                                    this.testWordSquare[letterInd] = possibleWord;
                                    if (this.testWordSquare.length === this.currentWR.words.length) {
                                        console.log(this.currentWR.words, 'IS a wordsquare');
                                        return true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } else {
            // ! pass case 2
            // words = [OPA, POP, PAP]
            // POP
            // OPA
            // PAP
            // inds.OPA = [0, 1] // ! first try OPA as [0]
            // inds.POP = [0, 1, 2] // ! OPA
            // inds.PAP = [0, 1, 2] 
            console.log('wordInfo:', wordInfo);
        }
        return false;
    }
    // console.log('this.currentWR:', this.currentWR);
    // console.log(this.currentWR.words, 'is NOT wordsquare');
}


// pass case 1
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
// inds.POP = [0, 1] // ! first try POP as [0]
// inds.OPA = [0, 1, 2] // ! POP, 
// inds.PAP = [0, 1, 2] 
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
// const words3 = ['OPA', 'POD', 'PAP']
// new WordSquares(words3)