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
    constructor(allWords) {
        this.allWords = allWords;
        let wordRecords = this.setupRecords(allWords);
        if (wordRecords) {
            wordRecords = this.populatePossibleInds(wordRecords);
            this.isWordSquare(wordRecords);
        }
    }
    // returns false when words isNOT a wordSquare
    setupRecords(words) {
        const firstLetters = {}; // <letter, wordInds>
        const wordsInfo = [];
        for (let wordInd = 0; wordInd < words.length; wordInd++) {
            const word = words[wordInd];
            if (word.length !== words.length) {
                // if the length of the array is not equal to each word length, return false
                return false;
            }
            const firstLetter = word[0];
            if (!firstLetters[firstLetter]) {
                firstLetters[firstLetter] = [wordInd];
            }
            else {
                firstLetters[firstLetter].push(wordInd);
            }
            wordsInfo[wordInd] = {
                wordInd: wordInd,
                word: word,
                possibleInds: new Set([0])
            };
        }
        return {
            firstLetters: firstLetters,
            wordsInfo: wordsInfo,
            words: words
        };
    }
    populatePossibleInds(wordRecords) {
        for (let wordInd = 0; wordInd < wordRecords.words.length; wordInd++) {
            const word = wordRecords.words[wordInd];
            // wordSqaures can be 2x2, 3x3, 4x4, 5x5, etc.
            for (let letterInd = 1; letterInd < word.length; letterInd++) {
                const letter = word[letterInd];
                if (wordRecords.firstLetters[letter]) {
                    wordRecords.firstLetters[letter].forEach((wordIndex) => {
                        // all words beginning with letter need letterInd added to their possibleInds
                        wordRecords.wordsInfo[wordIndex].possibleInds.add(letterInd);
                    });
                }
            }
        }
        wordRecords.wordsInfo.sort((a, b) => {
            return a.possibleInds.size - b.possibleInds.size;
        });
        return wordRecords;
    }
    isWordSquare(wordRecords) {
        // console.log(wordRecords)
        // console.log(wordRecords.wordsInfo)
        const testWordSquare = [];
        const usedInds = [];
        for (let i = 0; i < wordRecords.wordsInfo.length; i++) {
            const wordInfo = wordRecords.wordsInfo[i];
            if (wordInfo.possibleInds.size === 1) {
                // console.log(wordInfo)
                const onePositionWordInd = wordInfo.possibleInds.values().next().value;
                testWordSquare[onePositionWordInd] = wordInfo.word;
                usedInds.push(i);
                for (let letterInd = 0; letterInd < wordInfo.word.length; letterInd++) {
                    // skip onePositionWordInd as the word has been placed there
                    if (letterInd !== onePositionWordInd) {
                        const letter = wordInfo.word[letterInd];
                        // look for letter in firstLetters
                        // console.log('letter:', letter);
                        if (wordRecords.firstLetters[letter].length === 1) {
                            const matchedInd = wordRecords.firstLetters[letter][0];
                            const wordToTry = wordRecords.words[matchedInd];
                            testWordSquare[letterInd] = wordToTry;
                        }
                        else {
                            for (let firstLtrMatch = 0; firstLtrMatch < wordRecords.firstLetters[letter].length; firstLtrMatch++) {
                                const matchedInd = wordRecords.firstLetters[letter][firstLtrMatch];
                                const possibleWord = wordRecords.words[matchedInd];
                                // const testWord = testWordSquare[]
                                for (let testSqInd = 1; testSqInd < testWordSquare.length; testSqInd++) {
                                    const testWord = testWordSquare[testSqInd];
                                    if (possibleWord[testSqInd] === testWord[letterInd]) {
                                        testWordSquare[letterInd] = possibleWord;
                                        break;
                                    }
                                }
                            }
                        }
                        // ! BALL -> finalWords[0] -> wordInd = 1, usedInds = [1]
                        // console.log(this.wordsInfo)
                        // letterInd = 1, 'A' -> this.firstLetters['A'], [2] ->
                        // words[2] -> AREA -> finalWords[letterInd], wordInd = 2, usedInds = [1, 2]
                        // letterInd = 2, 'L' -> this.firstLetters['L'], [0, 3]
                        // words[0], LADY, check against rest of grid
                        // L'A'DY vs AR'E'A. possibleWord[1] must equal testWordSquare[1][letterInd] ! doesn't
                        // L'E'AD vs AR'E'A. possibleWord[1] must equal testWordSquare[1][letterInd]
                        // letterInd = 3, L'A'DY vs ARE'A'. possibleWord[1] must equal testWordSquare[1][letterInd]
                        // words[3] -> LEAD -> AREA[letterInd], 'E' is in place. LEAD[1], 'E' -> LEAD -> finalWords[letterInd], usedInds = [1, 2, 3]
                        // 'L' -> this.firstLetters['L'], [0, 3], filter usedInds -> [0] -> LADY -> finalWords[letterInd]
                    }
                }
            }
        }
        if (testWordSquare.length === wordRecords.words.length) {
            console.log(wordRecords.words, 'IS a wordsquare');
        }
        else {
            console.log(wordRecords.words, 'is NOT wordsquare');
        }
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
const words1 = ['LADY', 'BALL', 'AREA', 'LEAD'];
new WordSquares(words1);
// ! pass case 2
// words = [OPA, POP, PAP]
// POP
// OPA
// PAP
// inds.POP = [0, 1] // ! first try POP as [0]
// inds.OPA = [0, 1, 2] // ! POP, 
// inds.PAP = [0, 1, 2] 
const words2 = ['OPA', 'POP', 'PAP'];
new WordSquares(words2);
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
new WordSquares(words3);
// ! fail Case
