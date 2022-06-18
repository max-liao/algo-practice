// .sort()
// -1 moves to right
// 1 moves to left


/*
 * Complete the 'luckBalance' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER k
 *  2. 2D_INTEGER_ARRAY contests
 */

function luckBalance(maxImportantLosses: number, contests: number[][]): number {

    // sort by importance then luck value
    contests.sort((a, b) => {
        // index 0 is the contest's luck
        // index 1 is the contest's importance
        const contestALuck = a[0];
        const contestBLuck = b[0];
        const contestAImportance = a[1];
        const contestBImportance = b[1];
        if (!contestAImportance || !contestBImportance) {
            return contestBImportance - contestAImportance;
        } else if (contestAImportance && contestBImportance) {
            return contestBLuck - contestALuck;
        }
        // else {
        //     return -1;
        // }
    })

    console.log(contests)

    // Write your code here
    let luckBalance = 0

    for (let i = 0; i < contests.length; i++) {
        // index 0 is the contest's luck
        const contestLuck = contests[i][0];
        // index 1 is the contest's importance
        const contestImportance = contests[i][1];
        if (contestImportance) {
            if (maxImportantLosses > 0) {
                // if contest is important and she loses, add to luckBalance
                maxImportantLosses--
                luckBalance += contestLuck
            } else {
                // if contest is important and she wins, subtract to luckBalance
                luckBalance -= contestLuck
            }
        } else {
            // if not important, she loses, add to balance
            luckBalance += contestLuck;
        }
    }

    // console.log('luckBalance:', luckBalance);
    // the maximum luck balance achievable 
    return luckBalance
}

// should equal 29
// const contests = [[5, 1], [2, 1], [1, 1], [8, 1], [10, 0], [5, 0]]
const k = 4
const contests = [
    [663, 1],
    [943, 1],
    [448, 1],
    [170, 1],
    [841, 1],
    [665, 1],
    [963, 1],
    [706, 1],
    [779, 1],
    [806, 1],
    [119, 0],
    [530, 1],
    [758, 1],
    [539, 1],
    [394, 1],
    [712, 1],
    [440, 1],
    [896, 1],
    [828, 1],
    [605, 1],
    [265, 1],
    [549, 1],
    [102, 1],
    [538, 1],
    [962, 1],
    [891, 1],
    [860, 1],
    [465, 1],
    [548, 1],
    [334, 1],
    [895, 1],
    [359, 1],
    [724, 1],
    [323, 1],
    [645, 1],
    [812, 1],
    [757, 1],
    [725, 1],
    [309, 1],
    [392, 1],
    [955, 1],
    [36, 1],
    [38, 1],
    [649, 1],
    [727, 1],
    [772, 1],
    [317, 1],
    [447, 1],
    [154, 1],
    [437, 1],
    [42, 1],
    [630, 1],
    [254, 1],
    [967, 1],
    [717, 1],
    [289, 1],
    [351, 1],
    [7, 1],
    [293, 1],
    [422, 1],
    [828, 1],
    [335, 1],
    [913, 1],
    [377, 1],
    [843, 1],
    [142, 1],
    [146, 1],
    [501, 1],
    [41, 1],
    [704, 1],
    [870, 1],
    [869, 1],
    [719, 1],
    [36, 1],
    [932, 1],
    [945, 1],
    [383, 1],
    [674, 1],
    [903, 1],
    [492, 1],
    [85, 1],
    [668, 1],
    [191, 1],
    [468, 1],
    [282, 1],
    [627, 1],
    [479, 1],
    [300, 1],
    [539, 1],
    [742, 1],
    [624, 1],
    [324, 1],
    [730, 1],
    [371, 1],
    [107, 1],
    [996, 1],
    [943, 1],
]
luckBalance(k, contests)

// -44879
