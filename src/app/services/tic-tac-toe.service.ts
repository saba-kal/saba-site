import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

export enum GameSymbol {
    EMPTY = 'Empty',
    X = 'X',
    O = 'O'
}

export interface GridCell {
    symbol: GameSymbol,
    winner: boolean
}

@Injectable()
export class TicTacToeService {

    board: GridCell[][] = [];

    constructor() {
        for (let i = 0; i < 3; i++) {
            this.board.push([]);
            for (let j = 0; j < 3; j++){
                this.board[i].push({symbol: GameSymbol.EMPTY, winner: false});
            }
        }
    }

    getBoard(): GridCell[][] {
        return this.board
    }

    resetBoard(){
        this.board = [];
        for (let i = 0; i < 3; i++) {
            this.board.push([]);
            for (let j = 0; j < 3; j++){
                this.board[i].push({symbol: GameSymbol.EMPTY, winner: false});
            }
        }
    }
}