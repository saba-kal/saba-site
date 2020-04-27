import { PlayerColor } from "./player-color";
import { TilePosition } from "./tile-position";

export class Tile {

	private _color: PlayerColor;
	private _isKing: boolean;
	private _isEmpty: boolean;
	private _availableToMove: boolean;
	private _canBeMoved: boolean;

	constructor(color: PlayerColor, row: number, col: number, isEmpty: boolean) {
		this._color = color;
		this._isKing = false;
		this._isEmpty = isEmpty;
		this._availableToMove = false;
		this._canBeMoved = false;
	}

	get color(): PlayerColor {
		return this._color;
	}
	set color(color: PlayerColor) {
		this._color = color;
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

	get canBeMoved(): boolean {
		return this._canBeMoved;
	}
	set canBeMoved(canBeMoved: boolean) {
		this._canBeMoved = canBeMoved;
	}
}