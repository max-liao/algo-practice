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

function wordSquares(words: string[]) {
    const confirmedSquares: string[][] = [];
    // ? separate words by length
    const wordMap = new Map<number, string[]>();

    // loop through wordMap and run isWordSquare on entries

    // if isWordSquare returns true, add to confirmedSquares

    return confirmedSquares
}


// checks if arr is a word square
function isWordSquare(words: string[]) {
    // wordSqaures can be 2x2, 3x3, 4x4, 5x5, etc.
    // if the length of the array is not equal to each word length, return false


    // else loop through each word
    // words = [LADY, BALL, AREA, LEAD]
    // words = [OPA, POP, PAP]
    // words = [OPA, POD, PAP]

    // the only two letters that can not have a matching pair are the top left and bottom right chars
    // ? Map letters?
    // if (letters % 2 != 0)
    // if all pairs match, run check by iteration

    // words = [OPA, POD, PAP]
    // D is only letter that does not have a matching pair
    // D is last char of POD, try POD as last index
    // POD -> D
    // O -> must be w


    // words = [OPA, POP, PAP]
    // POP -> first char P. remove POP from words to check
    // O -> firstchar of OPA
    // P -> first char of PAP

    // OPA
    // P -> 2nd char of OPA
    // A -> 2nd char of PAP. remove OPA from words to check

    // PAP 
    // A -> 3rd char of OPA
    // P -> 3rd char of PAP. return true


    // B -> first letter of its word. Try as word at 0 index
    // BALL -> first char 'B'
    // A -> is firstChar of other word (first letter index 1)
    // L -> is firstChar of other word (first letter index 2)
    // L -> is firstChar of other word (first letter index 3)
    // remove BALL from list. Can not be used at another index

    // word at index 1 will begin with 'A'
    // try all words that start with 'A'
    // AREA -> first char 'A'
    // R -> is second char of word
    // E -> is second char of word
    // A -> is second char of word
    // remove AREA from list. Can not be used at another index

    // word at index 2 will begin with 'L'
    // try all words that start with 'L'
    // LADY -> first char 'L'
    // A -> is NOT second char of word
    // LEAD -> first char 'L'
    // E -> is second char of word
    // A -> is 3rd char of word
    // A -> is 4th char of word



    // LADY -> last char 'Y'
    // try possibleStartSquare(s) as the first word





    // B -> A, A must be the first letter of another word
    // L -> L, L must be the first letter of another word
    // L -> L, L must be the first letter of another word


    // return false if a bad letter is found
}