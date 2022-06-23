// recreate minesweeper
// https://techdevguide.withgoogle.com/resources/former-interview-question-minesweeper/#!

type gridSpace = {
    col: number
    row: number
    revealed: boolean
    value: number
}

class MineSweeper {

    constructor(public grid: number[][]) {
        // copy input grid to a revealedGrid visible to the player
        for (let i = 0; i < grid.length; i++) {
            const row = grid[i];
            for (let j = 0; j < row.length; j++) {
                const gridVal = row[j];
                const newSpace: gridSpace = {
                    col: j,
                    row: i,
                    revealed: false,
                    value: gridVal
                };
                this.revealedGrid[i][j] = newSpace;
            }
        }
    }

    public rows: number;
    public cols: number;

    public revealedGrid: gridSpace[][];

    public static mineVal = 9;
    public static emptyVal = 0;

    public resize(newRows: number, newCols: number) {
        this.rows = newRows;
        this.cols = newCols;
    }

    public at(row: number, col: number) {
        return this.grid[row][col];
    }

    public reveal(row: number, col: number) {
        const revealSquare = this.grid[row][col]
        if (revealSquare === MineSweeper.mineVal) {
            // if mine hit, end game

        } else if (revealSquare === MineSweeper.emptyVal) {
            // if empty reveal every surrounding spot
            // keep going until numbers are hit
        } else {
            // if neighboring a mine (value > 0 , value < 9)
            // reveal surrounding spot not neighboring a mine

        }
    }
}; 