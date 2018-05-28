import { Tile } from "./tile";
import { PlayerColor } from "./player-color";

export class CheckersBoard {
    
    private _board: Tile[][];
    
    constructor() {
        this.resetBoard();
    }

    get board(): Tile[][]{
        return this._board;
    }

    /**
     * Move a piece from a certain location to a certain location
     * @param fromRow Starting row of piece
     * @param fromCol starting column of piece
     * @param toRow Desired piece row
     * @param toCol Desired piece column
     */
    movePiece(fromRow: number, fromCol: number, toRow: number, toCol: number){

        //Remove all previous marks
        this.hideAvailableMoves();
        
        //Game piece that we want to move
        let gamePiece: Tile = this._board[fromRow][fromCol];

        //Make sure we are not moving an empty tile
        if(!gamePiece.isEmpty){
            //Change position within the game piece (tile object)
            gamePiece.row = toRow;
            gamePiece.col = toCol;
            //Make the to position on the board a game piece
            this._board[toRow][toCol].isEmpty = false;
            this._board[toRow][toCol].color = gamePiece.color;
            //Make the from position empty
            this._board[fromRow][fromCol].isEmpty = true;
        } else {
            throw 'A game piece was not found at ('+fromRow+', '+fromCol+')';
        }
    }

    /**
     * Reset the board to original layout.
     * 12 pieces for white and 12 pieces for red
     */
    resetBoard(){
        this._board = [];
        for (let i = 0; i < 8; i++) {
            this._board.push([]);
            for (let j = 0; j < 8; j++){
                this._board[i].push(new Tile(null, i, j, true));
                //Top three rows and every other square is a red game piece
                if((i+j) % 2 == 1 && i < 3){
                    let gamePiece: Tile = new Tile(PlayerColor.RED, i, j, false);
                    this._board[i][j] = gamePiece;
                }
                //Bottom three rows and every other square is a white game piece
                if((i+j) % 2 == 1 && i > 4){
                    let gamePiece: Tile = new Tile(PlayerColor.BLACK, i, j, false);
                    this._board[i][j] = gamePiece;
                }
            }
        }
    }

    /**
     * Show what moves a game piece can make to by marking tiles
     * @param row Row of the game piece
     * @param col Col of the game piece
     */
    showAvailableMoves(row: number, col: number) {
        //Remove all previous marks
        this.hideAvailableMoves();

        //Mark moves for a red piece
        if(this._board[row][col].color == PlayerColor.RED){
            //Check if right diagonal exists and is empty
            if(this._board[row + 1][col + 1] && this._board[row + 1][col + 1].isEmpty){
                this._board[row + 1][col + 1].availableToMove = true;
            }
            //Check if left diagonal exists and is empty
            if(this._board[row + 1][col - 1] && this._board[row + 1][col - 1].isEmpty){
                this._board[row + 1][col - 1].availableToMove = true;
            }
        }

        //Mark moves for a black piece
        if(this._board[row][col].color == PlayerColor.BLACK){
            //Check if right diagonal exists and is empty
            if(this._board[row - 1][col + 1] && this._board[row - 1][col + 1].isEmpty){
                this._board[row - 1][col + 1].availableToMove = true;
            }
            //Check if left diagonal exists and is empty
            if(this._board[row - 1][col - 1] && this._board[row - 1][col - 1].isEmpty){
                this._board[row - 1][col - 1].availableToMove = true;
            }
        }
    }

    /**
     * Remove availableToMove marks on all tiles
     */
    hideAvailableMoves(){
        for (let i = 0; i < this._board.length; i++) {
            for (let j = 0; j < this._board[i].length; j++) {
                this._board[i][j].availableToMove = false;
            }
        }
    }
}