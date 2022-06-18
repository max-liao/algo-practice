const heights1 = [1, 3, 2, 4, 1, 3, 1, 4, 5, 2, 2, 1, 4, 2, 2] // 15
const heights2 = [1, 3, 2, 4, 1, 3, 1, 4, 5, 2, 2, 1, 2, 3, 4] // 18

interface TerrainHeight {
    index?: number,
    height?: number,
}

function volumeOfLakes(terrainHeights: number[]) {
    let totalVolume = 0

    // ! define leftbound as a height less than previous height
    let leftBound: TerrainHeight = {}
    // ! define right bound of lake as a height greater or equal to the left bound
    // ! OR if end of array hit, define rightBound from saved value and run subtract fnc 
    // ! if no saved rightBound, discard currntLakeVol and end
    let potentialRightBound: TerrainHeight = {}

    let currentLakeVol: number = 0

    let currInd = 1

    const calculateLakeVol = () => {
        // add currentLakeVol to totalVolume
        totalVolume += currentLakeVol
        // reset for next lake
        currentLakeVol = 0;
        leftBound = {}
        potentialRightBound = {}
    }

    // at end of array, adjust currentLakeVol by substracting(rightBoundIndex - leftboundIndex) * height difference
    const adjustForPotentialRightBound = () => {
        if (potentialRightBound.height && potentialRightBound.index && leftBound.height && leftBound.index) {
            // subtract volume of right side (no lake)
            for (let i = terrainHeights.length - 1; i > potentialRightBound.index; i--) {
                currentLakeVol -= (leftBound.height - terrainHeights[i])
            }
            // subtract top of lake that falls off to the right
            currentLakeVol -= (potentialRightBound.index - leftBound.index) * (leftBound.height - potentialRightBound.height)
            calculateLakeVol()
        }
    }

    while (currInd < terrainHeights.length) {
        // check if value at nextInd is less than or greater than
        const prevHeight = terrainHeights[currInd - 1]
        const currHeight = terrainHeights[currInd]
        // if currHeight < previousHeight. Set previousHeight as left boundary
        if (currHeight < prevHeight) {
            if (leftBound.height === undefined) {
                leftBound = {
                    index: currInd - 1,
                    height: prevHeight,
                }
                // start a volume calculation
                currentLakeVol += prevHeight - currHeight
            } else {
                // inside a lake so add volume
                currentLakeVol += leftBound.height - currHeight
            }
        } else if (currHeight > prevHeight) {
            // if currHeight greater than previousHeight, check if it is right bound of lake
            if (leftBound.height) {
                const isRightBound = currHeight >= leftBound.height
                if (isRightBound) {
                    calculateLakeVol()
                } else {
                    // could be right bound if array ends without a currHeight >= leftBound.height
                    if (potentialRightBound.height === undefined || potentialRightBound.height < currHeight) {
                        potentialRightBound = {
                            index: currInd,
                            height: currHeight,
                        }
                    }
                    // subtract function will correct this if it is rightBound
                    currentLakeVol += leftBound.height - currHeight
                }
            }
        } else {
            if (leftBound.height) {
                currentLakeVol += leftBound.height - currHeight
            }
        }
        currInd++
    }

    adjustForPotentialRightBound()
    console.log(totalVolume)
    return currentLakeVol
}

volumeOfLakes(heights2)