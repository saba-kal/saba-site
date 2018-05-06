import { Injectable } from '@angular/core';
import { Observable , of } from 'rxjs'

export enum GridCell {
    EMPTY,
    X,
    O
}

@Injectable()
export class TicTacToeService {

    board: GridCell[][] = [
        [GridCell.EMPTY, GridCell.EMPTY, GridCell.EMPTY],
        [GridCell.EMPTY, GridCell.EMPTY, GridCell.EMPTY],
        [GridCell.EMPTY, GridCell.EMPTY, GridCell.EMPTY]
    ];
    
    activePlayer = GridCell.X;

    constructor() { }

    getBoard(): Observable<GridCell[][]> {
        return of(this.board);
    }

    getActivePlayer(): Observable<any>{
        return of(this.activePlayer);
    }

    changeCell(row, col){
        this.board[row][col] = this.activePlayer;
        switch(this.activePlayer){
            case GridCell.O: this.activePlayer = GridCell.X; break;
            case GridCell.X: this.activePlayer = GridCell.O; break;
            case GridCell.EMPTY: this.activePlayer = GridCell.O; break;
        }
    }
}