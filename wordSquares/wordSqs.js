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
class WordSquares {
    allWords;
    firstLetters = {}; // <letter, wordInds>
    wordsInfo = [];
    constructor(allWords) {
        this.allWords = allWords;
        this.setupRecords(allWords);
        this.populatePossibleInds(allWords);
        console.log(this.wordsInfo);
    }
    setupRecords(words) {
        for (let wordInd = 0; wordInd < words.length; wordInd++) {
            const word = words[wordInd];
            const firstLetter = word[0];
            if (!this.firstLetters[firstLetter]) {
                this.firstLetters[firstLetter] = [wordInd];
            }
            else {
                this.firstLetters[firstLetter].push(wordInd);
            }
            this.wordsInfo[wordInd] = {
                word: word,
                possibleInds: new Set([0])
            };
        }
    }
    populatePossibleInds(words) {
        const sideLength = words.length;
        for (let wordInd = 0; wordInd < sideLength; wordInd++) {
            const word = words[wordInd];
            // wordSqaures can be 2x2, 3x3, 4x4, 5x5, etc.
            if (word.length !== sideLength) {
                // if the length of the array is not equal to each word length, return false
                return;
            }
            else {
                for (let letterInd = 1; letterInd < word.length; letterInd++) {
                    const letter = word[letterInd];
                    if (this.firstLetters[letter]) {
                        this.firstLetters[letter].forEach((wordIndex) => {
                            // all words beginning with letter need letterInd added to their possibleInds
                            this.wordsInfo[wordIndex].possibleInds.add(letterInd);
                        });
                    }
                }
            }
        }
    }
}
// ! pass case 1
// const words1 = ['LADY', 'BALL', 'AREA', 'LEAD']
// BALL
// AREA
// LEAD
// LADY
// inds.LADY = [0, 2, 3] // ! LADY is only word with [3], try there
// inds.BALL = [0] // ! BALL only has [0], try there to pass/fail
// inds.AREA = [0, 1, 2] // ! BALL, AREA is [1]
// inds.LEAD = [0, 1, 2] // ! BALL, LADY[3] is taken, LEAD is [2]
const words1 = ['LADY', 'BALL', 'AREA', 'LEAD'];
new WordSquares(words1);
// ! pass case 2
// words = [OPA, POP, PAP]
// POP
// OPA
// PAP
// inds.POP = [0, 1]
// inds.OPA = [0, 1, 2]
// inds.PAP = [0, 1, 2] 
// const words2 = ['OPA', 'POP', 'PAP']
// new WordSquares(words2)
// POP -> first char P. remove POP from words to check
// O -> firstchar of OPA
// P -> first char of PAP
// OPA
// P -> 2nd char of OPA
// A -> 2nd char of PAP. remove OPA from words to check
// PAP 
// A -> 3rd char of OPA
// P -> 3rd char of PAP. return true
const words3 = ['OPA', 'POD', 'PAP'];
// ! fail Case
