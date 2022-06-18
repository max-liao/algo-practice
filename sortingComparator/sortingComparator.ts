const input = [
    '5',
    'amy 100',
    'david 100',
    'heraldo 50',
    'aakansha 75',
    'aleksa 150'
]

type Player = {
    name: string,
    score: number,
    originalStr: string
}

function sortingComparator(input: string[]) {
    const arrSize = input[0]
    const inputArr = input.slice(1)
    // map types
    const playerArr: Player[] = inputArr.map((playerStr => {
        const [name, score] = playerStr.split(' ')
        return {
            name,
            score: Number(score),
            originalStr: playerStr
        }
    }))

    playerArr.sort((a, b) => {
        if (a.score === b.score) {
            return a.name.localeCompare(b.name)
        } else {
            return b.score - a.score
        }
    })
    console.log(playerArr.map(player => player.originalStr).join('\n'))
}
