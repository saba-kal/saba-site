import { PlayerColor } from "./player-color";

export class Tile {
    
    private _color: PlayerColor;
    private _row: number;
    private _col: number;
    private _isKing: boolean;
    private _isEmpty: boolean;
    private _availableToMove: boolean;

    constructor(color: PlayerColor, row: number, col: number, isEmpty: boolean){
        this._color = color;
        this._row = row;
        this._col = col;
        this._isKing = false;
        this._isEmpty = isEmpty;
        this._availableToMove = false;
    }

    get color(): PlayerColor {
        return this._color;
    }
    set color(color: PlayerColor){
        this._color = color;
    }

    get row(): number {
        return this._row;
    }
    set row(row: number) {
        this._row = row;
    }

    get col(): number {
        return this._col;
    }
    set col(col: number) {
        this._col = col;
    }

    get isKing(): boolean {
        return this._isKing;
    }
    set isKing(isKing: boolean) {
        this._isKing = isKing;
    }

    get isEmpty(): boolean {
        return this._isEmpty;
    }
    set isEmpty(isEmpty: boolean) {
       this._isEmpty = isEmpty;
    }

    get availableToMove(): boolean {
        return this._availableToMove;
    }
    set availableToMove(availableToMove: boolean) {
       this._availableToMove = availableToMove;
    }
}