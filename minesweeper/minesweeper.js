// recreate minesweeper
// https://techdevguide.withgoogle.com/resources/former-interview-question-minesweeper/#!
class MineSweeper {
    numRows;
    numCols;
    numMines;
    grid = [];
    constructor(numRows, numCols, numMines) {
        this.numRows = numRows;
        this.numCols = numCols;
        this.numMines = numMines;
        for (let i = 0; i < numRows; i++) {
            this.grid[i] = [];
            this.grid[i] = new Array(numCols).fill(0);
        }
        console.log(this.grid);
        // TODO place mines
        // if more mines than spaces randomize spaces
        // make set of coords of mines/spaces equal to the mine#
        // pick 2 random numbers (0:rows) (0:cols), add to set of coords [rowI, colI]
        // copy input grid to a revealedGrid visible to the player
        for (let i = 0; i < this.grid.length; i++) {
            const row = this.grid[i];
            for (let j = 0; j < row.length; j++) {
                const gridVal = row[j];
                const newSpace = {
                    col: j,
                    row: i,
                    revealed: false,
                    value: gridVal
                };
                this.revealedGrid[i][j] = newSpace;
            }
        }
    }
    rows;
    cols;
    revealedGrid;
    static mineVal = 9;
    static emptyVal = 0;
    resize(newRows, newCols) {
        this.rows = newRows;
        this.cols = newCols;
    }
    at(row, col) {
        return this.grid[row][col];
    }
    reveal(row, col) {
        const revealSquare = this.grid[row][col];
        if (revealSquare === MineSweeper.mineVal) {
            // if mine hit, end game
        }
        else if (revealSquare === MineSweeper.emptyVal) {
            // if empty reveal every surrounding spot
            // keep going until numbers are hit
        }
        else {
            // if neighboring a mine (value > 0 , value < 9)
            // reveal surrounding spot not neighboring a mine
        }
    }
}
;
new MineSweeper(5, 4, 5);
