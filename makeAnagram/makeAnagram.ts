const a = "fcrxzwscanmligyxyvym";
const b = "jxwtrhvujlmrpdoqbisbwhmgpmeoke";

function makeAnagram(a, b) {
    let deletions = 0;
    const mapStrings = (charArr) => {
        const letterMap = new Map();
        for (let letter of charArr) {
            letterMap.set(letter, isNaN(letterMap.get(letter)) ? 1 : letterMap.get(letter) + 1);
        }
        return letterMap;
    };
    // create set of uniqueLetters
    const uniqueLetters = new Set([...a, ...b]);
    const aMap = mapStrings([...a]);
    const bMap = mapStrings([...b]);
    for (let letter of uniqueLetters) {
        const aCount = aMap.get(letter) ?? 0;
        const bCount = bMap.get(letter) ?? 0;
        if (aCount !== bCount) {
            deletions += Math.abs(aCount - bCount);
        }
    }
    return deletions;
}
makeAnagram(a, b);
