// recreate minesweeper
// https://techdevguide.withgoogle.com/resources/former-interview-question-minesweeper/#!

class MineSweeper {

    constructor(public grid: number[][]) { }

    public rows: number;
    public cols: number;

    public resize(newRows: number, newCols: number) {
        this.rows = newRows;
        this.cols = newCols;
    }

    public at(row: number, col: number) {
        return this.grid[row][col];
    }

    public reveal(row: number, col: number) {

    }
}; 