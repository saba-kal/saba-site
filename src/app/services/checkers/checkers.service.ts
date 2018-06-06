import { Injectable } from '@angular/core';
import { CheckersBoard } from './models/checkers-board';
import { TilePosition } from './models/tile-position';
import { PlayerColor } from './models/player-color';
import { Tile } from './models/tile';
import { Move } from './models/move';

@Injectable()
export class CheckersService {

    board: CheckersBoard;
    activePosition: TilePosition;
    activePlayer: PlayerColor;
    possibleMoves: Move[];

    constructor() { 
        this.board = new CheckersBoard();
        this.activePlayer = PlayerColor.BLACK;
        this.board.getAllPossibleMoves(this.activePlayer);
    }

    getAllTiles(): Tile[][] {
        return this.board.getAllTiles();
    }

    gamePieceClick(row: number, col: number){
        this.activePosition = {row: row, col: col};
        if(this.board.getTile({row: row, col: col}).canBeMoved){
            this.possibleMoves = this.board.getPossibleMoves(this.activePosition, this.activePlayer);
        }
    }

    moveTo(row: number, col: number){
        let tile = this.board.getAllTiles()[row][col];
        if (tile.availableToMove){
            this.board.movePiece(this.activePosition, {row: row, col: col});
            switch(this.activePlayer){
                case PlayerColor.BLACK: this.activePlayer = PlayerColor.RED; break;
                case PlayerColor.RED: this.activePlayer = PlayerColor.BLACK; break;
            }
            this.board.getAllPossibleMoves(this.activePlayer);
        }
    }
}