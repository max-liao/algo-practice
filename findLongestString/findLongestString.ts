/*
https://techdevguide.withgoogle.com/resources/former-interview-question-find-longest-word/#!

Given a string S and a set of words D, find the longest word in D that is a subsequence of S.

Word W is a subsequence of S if some number of characters, possibly zero, can be deleted from S to form W, without reordering the remaining characters.

    Note: D can appear in any format(list, hash table, prefix tree, etc.

For example, given the input of S = "abppplee" and D = { "able", "ale", "apple", "bale", "kangaroo"} the correct output would be "apple"

The words "able" and "ale" are both subsequences of S, but they are shorter than "apple".

The word "bale" is not a subsequence of S because even though S has all the right letters, they are not in the right order.

The word "kangaroo" is the longest word in D, but it isn't a subsequence of S.
*/

function findLongestString(str: string, words: string[]): string {
    // str = "abppplee" and words = [ "able", "ale", "apple", "bale", "kangaroo" ] the correct output would be "apple"
    // take word from array, iterate through str, keep track of wordInd
    // let longestWord = '';

    // ? sort by length before and find first word that matches
    // O(N*W) where W is the number of words and N is the number of characters in str.

    words.sort((a, b) => b.length - a.length)
    // for (let i = 0; i < words.length; i++) {
    //     const word = words[i]

    //     let wordInd = 0;
    //     let strInd = 0;

    //     // ? nested loop, O(n^2)
    //     while (wordInd < word.length && strInd < str.length) {
    //         // find first letter of word in
    //         if (word[wordInd] === str[strInd]) {
    //             // if char matches, increment wordInd and strInd
    //             wordInd++;
    //         }
    //         // if char doesn't match, only increment strInd
    //         strInd++;
    //     }
    //     // ! only need to return longest word, not all words
    //     if (wordInd === word.length) {
    //         // if arr is sorted by longest, first match will be the answer
    //         longestWord = word;
    //     }
    // }

    // ! Would your approach change if the size of the searched-in string N was much larger than the size of words?
    // ? Map each letter index in str to an alphabet map
    // O(N + L * log N) where L is the total number of characters in the dictionary over all words

    // a -> [0]
    // b -> [1]
    // p -> [2, 3, 4]
    // l -> [5]
    // e -> [6, 7]

    const alphabetMap = new Map<string, number[]>()
    const charArr = [...str]
    charArr.forEach((char, ind) => {
        if (!alphabetMap.has(char)) {
            alphabetMap.set(char, [ind])
        } else {
            alphabetMap.set(char, [...alphabetMap.get(char) as number[], ind])
        }
    });

    const checkWord = (word: string) => {
        const emptyWord = ''
        for (let wordInd = 0; wordInd < word.length; wordInd++) {
            const letter = word[wordInd];
            if (alphabetMap.has(letter)) {
                const alphabetInds: number[] = alphabetMap.get(letter) as number[];
                // ? use binary serach instead of indexOf
                const found = alphabetInds.find((alphaInd) => alphaInd >= wordInd)
                if (found === undefined) {
                    return emptyWord
                }
            } else {
                return emptyWord
            }

            if (wordInd === word.length - 1) {
                return word;
            }
        }
        return emptyWord
    }

    // loop through words decending
    for (let i = 0; i < words.length; i++) {
        const word = words[i]
        // each letter in word, look up in alphabet map, if letter exists, increment wordInd
        const wordMatches = checkWord(word)
        if (wordMatches) {
            return word
        }
    }
    return 'No Matches'
}

console.log(findLongestString('abppplee', ['able', 'bapplee', 'able', 'ale', 'apple', 'kangaroo'])); // apple