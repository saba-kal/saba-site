import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

export enum GameSymbol {
    EMPTY,
    X,
    O
}

export interface GridCell {
    symbol: GameSymbol,
    winner: boolean
}

@Injectable()
export class TicTacToeService {

    board: GridCell[][] = [];
    activePlayer: GameSymbol = GameSymbol.X;

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

    getActivePlayer(): GameSymbol{
        return this.activePlayer;
    }

    changeCell(row, col){
        this.board[row][col].symbol = this.activePlayer;
        switch(this.activePlayer){
            case GameSymbol.O: this.activePlayer = GameSymbol.X; break;
            case GameSymbol.X: this.activePlayer = GameSymbol.O; break;
            case GameSymbol.EMPTY: this.activePlayer = GameSymbol.O; break;
        }
    }

    resetBoard(){
        this.board = [];
        for (let i = 0; i < 3; i++) {
            this.board.push([]);
            for (let j = 0; j < 3; j++){
                this.board[i].push({symbol: GameSymbol.EMPTY, winner: false});
            }
        }
        this.activePlayer = GameSymbol.X;
    }
}