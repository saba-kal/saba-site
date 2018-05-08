import { Component, OnInit } from '@angular/core';
import { GridCell, GameSymbol, TicTacToeService } from '../../services/tic-tac-toe.service';

@Component({
    selector: 'tic-tac-toe',
    templateUrl: 'tic-tac-toe.component.html',
    styleUrls: ['tic-tac-toe.component.css']
})

export class TicTacToeComponent implements OnInit {

    gameSymbol = GameSymbol; //Store reference to GameSymbol enum so we can use it in the template
    gameBoard: GridCell[][];
    activePlayer: GameSymbol;
    lockBoard: boolean;

    constructor(private _ticTacToeService: TicTacToeService) { }

    /**
     * Component Initialization. The game board and active player are service
     * based because it allows us to store the state of the board even if
     * the user navigates away
     */
    ngOnInit() {
        //Get board
        this.gameBoard = this._ticTacToeService.getBoard();
        //Get active player
        this.activePlayer = this._ticTacToeService.getActivePlayer();
    }

    /**
     * Change cell on click if it is empty
     * @param row Row number
     * @param col Column number
     */
    onCellClick(row, col){
        if (this.gameBoard[row][col].symbol == GameSymbol.EMPTY){
            this._ticTacToeService.changeCell(row, col);
            this.activePlayer = this._ticTacToeService.getActivePlayer();
            this.checkWin();
        }
    }

    /**
     * Make all gridcells empty
     */
    resetBoard(){
        this._ticTacToeService.resetBoard();
        this.lockBoard = false;
        //For some reason, the board does not automatically update. Subscriptions don't seem to work either
        //TODO: Figure out why and remove the line below
        this.gameBoard = this._ticTacToeService.getBoard();
    }

    /**
     * Check for the win condition
     */
    checkWin(){
        //Ceck row
        for (let i = 0; i < this.gameBoard.length; i++) {
            if(this.gameBoard[i][0].symbol == this.gameBoard[i][1].symbol &&
            this.gameBoard[i][1].symbol == this.gameBoard[i][2].symbol &&
            this.gameBoard[i][0].symbol != GameSymbol.EMPTY){
                this.gameBoard[i][0].winner=true;
                this.gameBoard[i][1].winner=true;
                this.gameBoard[i][2].winner=true;
                this.lockBoard = true;
            }
        }
        //Ceck column
        for (let i = 0; i < this.gameBoard[0].length; i++) {
            if(this.gameBoard[0][i].symbol == this.gameBoard[1][i].symbol &&
            this.gameBoard[1][i].symbol == this.gameBoard[2][i].symbol &&
            this.gameBoard[0][i].symbol != GameSymbol.EMPTY){
                this.gameBoard[0][i].winner=true;
                this.gameBoard[1][i].winner=true;
                this.gameBoard[2][i].winner=true;
                this.lockBoard = true;
            }
        }
         // 1st diagonal
        if(this.gameBoard[0][0].symbol == this.gameBoard[1][1].symbol && 
        this.gameBoard[1][1].symbol == this.gameBoard[2][2].symbol && 
        this.gameBoard[0][0].symbol != GameSymbol.EMPTY){
            this.gameBoard[0][0].winner=true;
            this.gameBoard[1][1].winner=true;
            this.gameBoard[2][2].winner=true;
            this.lockBoard = true;
        }
        // 2nd diagonal
        if(this.gameBoard[0][2].symbol == this.gameBoard[1][1].symbol && 
        this.gameBoard[1][1].symbol == this.gameBoard[2][0].symbol && 
        this.gameBoard[0][2].symbol != GameSymbol.EMPTY){
            this.gameBoard[0][2].winner=true;
            this.gameBoard[1][1].winner=true;
            this.gameBoard[2][0].winner=true;
            this.lockBoard = true;
        }
        //Check if there are no moves left
        let count = 0;
        for (let i = 0; i < this.gameBoard.length; i++) {
            for (let j = 0; j < this.gameBoard[i].length; j++) {
                if (this.gameBoard[i][j].symbol == GameSymbol.EMPTY){
                    count++;
                }
            }
        }
        if (count == 0){
            this.lockBoard = true;
        }
    }
}