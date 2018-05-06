import { Component, OnInit } from '@angular/core';
import { GridCell, TicTacToeService } from '../../services/tic-tac-toe.service';

@Component({
    selector: 'tic-tac-toe',
    templateUrl: 'tic-tac-toe.component.html',
    styleUrls: ['tic-tac-toe.component.css']
})

export class TicTacToeComponent implements OnInit {

    gridCell = GridCell; //Store reference to GridCell enum so we can use it in the template
    gameBoard: GridCell[][];
    activePlayer: any;

    constructor(private _ticTacToeService: TicTacToeService) { }

    /**
     * Component Initialization. The game board and active player are service
     * based because it allows us to store the state of the board even if
     * the user navigates away
     */
    ngOnInit() {
        //Get board
        this._ticTacToeService.getBoard().subscribe(result => {
            this.gameBoard = result;
        });
        //Get active player
        this._ticTacToeService.getActivePlayer().subscribe(result => {
            this.activePlayer = result;
        });
    }

    onCellClick(row, col){
        if (this.gameBoard[row][col] == GridCell.EMPTY){
            this._ticTacToeService.changeCell(row, col);
        }
    }
}