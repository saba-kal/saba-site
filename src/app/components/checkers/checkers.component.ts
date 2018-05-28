import { Component, OnInit} from '@angular/core';
import { CheckersBoard } from './models/checkers-board';
import { Tile } from './models/tile';

@Component({
    selector: 'checkers',
    templateUrl: 'checkers.component.html',
    styleUrls: ['checkers.component.css']
})

export class CheckersComponent implements OnInit {

    checkersBoard: CheckersBoard;
    activePiece: Tile;

    constructor() { 
        this.checkersBoard = new CheckersBoard();
    }

    ngOnInit() {  }

    gamePieceClick(row: number, col: number){
        this.checkersBoard.showAvailableMoves(row, col);
        this.activePiece = this.checkersBoard.board[row][col];
    }

    tileClick(row: number, col: number){
        if (this.checkersBoard.board[row][col].availableToMove){
            this.checkersBoard.movePiece(this.activePiece.row, this.activePiece.col, row, col);
        }
    }
}