// recreate minesweeper
// https://techdevguide.withgoogle.com/resources/former-interview-question-minesweeper/#!

type GridSpace = {
    col: number
    row: number
    revealed: boolean
    value: number
}

class MineSweeper {

    constructor(public numRows: number, public numCols: number, public numMines: number) {
        // TODO place mines
        // if more mines than spaces randomize spaces
        // make set of coords of mines/spaces equal to the mine#
        // pick 2 random numbers (0:rows) (0:cols), add to set of coords [rowI, colI]
        const mineCoords: GridSpace[] = [];

        // populate grid and populate revealedGrid with GridSpace[]
        for (let i = 0; i < numRows; i++) {
            this.grid[i] = []
            // this.grid[i] = new Array(numCols).fill(0);
            for (let j = 0; j < numCols; j++) {
                // if [i, j] contained in
                // this.grid[i][j] = 0
            }
        }
        console.log(this.grid)


        // copy input grid to a revealedGrid visible to the player
        // for (let i = 0; i < this.grid.length; i++) {
        //     const row = this.grid[i];
        //     for (let j = 0; j < row.length; j++) {
        //         const gridVal = row[j];
        //         const newSpace: gridSpace = {
        //             col: j,
        //             row: i,
        //             revealed: false,
        //             value: gridVal
        //         };
        //         this.revealedGrid[i][j] = newSpace;
        //     }
        // }
    }

    public rows: number;
    public cols: number;

    public grid: number[][] = []
    public revealedGrid: number[][] = []

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

new MineSweeper(5, 4, 5)