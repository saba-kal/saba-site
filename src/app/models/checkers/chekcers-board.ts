import { Tile } from './tile';
import { TilePosition } from './tile-position';
import { PlayerColor } from './player-color';
import { Move } from './move';


export class CheckersBoard {

	private _board: Tile[][];

	constructor() {
		this.resetBoard();
	}

	getAllTiles(): Tile[][] {
		return this._board;
	}

	getTile(position: TilePosition): Tile {
		return this._board[position.row][position.col];
	}

	/**
	 * Move a piece from a certain location to a certain location
	 * @param fromTile Starting position of piece
	 * @param toTile Target position of piece
	 * @param takePiece position of piece that was taken
	 */
	movePiece(fromTile: TilePosition, toTile: TilePosition) {

		//Remove all previous marks
		this.hideAllMarks(true, false);

		//Game piece that we want to move
		let gamePiece: Tile = this.getTile(fromTile);
		//Where we want to move the game piece
		let targetPosition: Tile = this.getTile(toTile);

		//Make sure we are actually moving a piece and not an empty tile and the target destination is empty
		if (!gamePiece.isEmpty && targetPosition.isEmpty) {
			//Make the destination position on the board a game piece
			targetPosition.isEmpty = false;
			targetPosition.color = gamePiece.color;
			//Make the previous position empty
			gamePiece.isEmpty = true;

			//If the movement has length 2, this means that a piece was taken
			if (Math.abs(fromTile.row - toTile.row) == 2) {
				//Get taken piece's position
				let takenPiece: TilePosition = {
					row: fromTile.row - (fromTile.row - toTile.row) / 2,
					col: fromTile.col - (fromTile.col - toTile.col) / 2
				}
				//remove the piece
				this.getTile(takenPiece).isEmpty = true;
			}

		} else if (gamePiece.isEmpty) {
			throw 'A game piece was not found at (' + fromTile.row + ', ' + fromTile.col + ')';
		} else {
			throw 'Cannot move to position (' + toTile.row + ', ' + toTile.col + ') because it is not empty';
		}
	}

	/**
	 * Reset the board to original layout.
	 * 12 pieces for white and 12 pieces for red
	 */
	resetBoard() {
		this._board = [];
		for (let i = 0; i < 8; i++) {
			this._board.push([]);
			for (let j = 0; j < 8; j++) {
				this._board[i].push(new Tile(null, i, j, true));
				//Top three rows and every other square is a red game piece
				if ((i + j) % 2 == 1 && i < 3) {
					let gamePiece: Tile = new Tile(PlayerColor.RED, i, j, false);
					this._board[i][j] = gamePiece;
				}
				//Bottom three rows and every other square is a white game piece
				if ((i + j) % 2 == 1 && i > 4) {
					let gamePiece: Tile = new Tile(PlayerColor.BLACK, i, j, false);
					this._board[i][j] = gamePiece;
				}
			}
		}
	}

	/**
	 * Mark all available moves for a piece and return any taken pieces
	 * @param position Position of the game piece
	 * @param color Game piece's color
	 * @param hideMarks Determines if you want to hide previous marks
	 * @param isFollowUp If we are showing moves after a take, we only want to mark tiles for additional takes
	 */
	getPossibleMoves(position: TilePosition, color: PlayerColor, hideMarks: boolean = true, isFollowUp: boolean = false): Move[] {

		let row = position.row; //Row of piece
		let col = position.col; //Column of piece
		let moves: Move[] = []; //Possible moves

		//Remove all previous marks
		if (hideMarks) {
			this.hideAllMarks(true, false);
		}

		//Player cannot move opponents piece
		if (color != this.getTile(position).color) {
			return;
		}

		//Moves for a red piece
		if (this._board[row][col].color == PlayerColor.RED) {
			//Check if right diagonal exists and is empty
			if (this.availableToMove(row + 1, col + 1) && !isFollowUp) {
				this._board[row + 1][col + 1].availableToMove = true; //Mark move
				moves.push({
					fromPosition: position,
					toPosition: { row: row + 1, col: col + 1 },
					takenPiece: null
				});
			}
			//Jump is available
			else if (this.availableToMove(row + 2, col + 2) && this.isPiece(row + 1, col + 1, PlayerColor.BLACK)) {
				this._board[row + 2][col + 2].availableToMove = true;
				moves.push({
					fromPosition: position,
					toPosition: { row: row + 2, col: col + 2 },
					takenPiece: { row: row + 1, col: col + 1 }
				});
			}
			//Check if left diagonal exists and is empty
			if (this.availableToMove(row + 1, col - 1) && !isFollowUp) {
				this._board[row + 1][col - 1].availableToMove = true; //Mark move
				moves.push({
					fromPosition: position,
					toPosition: { row: row + 1, col: col - 1 },
					takenPiece: null
				});
			}
			//Jump is available
			else if (this.availableToMove(row + 2, col - 2) && this.isPiece(row + 1, col - 1, PlayerColor.BLACK)) {
				this._board[row + 2][col - 2].availableToMove = true;
				moves.push({
					fromPosition: position,
					toPosition: { row: row + 2, col: col - 2 },
					takenPiece: { row: row + 1, col: col - 1 }
				});
			}
		}

		//Moves for a black piece
		if (this._board[row][col].color == PlayerColor.BLACK) {
			//Check if right diagonal exists and is empty
			if (this.availableToMove(row - 1, col + 1) && !isFollowUp) {
				this._board[row - 1][col + 1].availableToMove = true;
				moves.push({
					fromPosition: position,
					toPosition: { row: row - 1, col: col + 1 },
					takenPiece: null
				});
			}
			//Jump is available
			else if (this.availableToMove(row - 2, col + 2) && this.isPiece(row - 1, col + 1, PlayerColor.RED)) {
				this._board[row - 2][col + 2].availableToMove = true;
				moves.push({
					fromPosition: position,
					toPosition: { row: row - 2, col: col + 2 },
					takenPiece: { row: row - 1, col: col + 1 }
				});
			}
			//Check if left diagonal exists and is empty
			if (this.availableToMove(row - 1, col - 1) && !isFollowUp) {
				this._board[row - 1][col - 1].availableToMove = true;
				moves.push({
					fromPosition: position,
					toPosition: { row: row - 1, col: col - 1 },
					takenPiece: null
				});
			}
			//Jump is available
			else if (this.availableToMove(row - 2, col - 2) && this.isPiece(row - 1, col - 1, PlayerColor.RED)) {
				this._board[row - 2][col - 2].availableToMove = true;
				moves.push({
					fromPosition: position,
					toPosition: { row: row - 2, col: col - 2 },
					takenPiece: { row: row - 1, col: col - 1 }
				});
			}
		}

		return moves;
	}

	/**
	 * Get all possible moves for a specific color.
	 * Only accounts for single jumps.
	 * @param color Which player we want to get moves for
	 */
	getAllPossibleMoves(color: PlayerColor): Move[] {

		let possibleMoves: Move[] = []; //Moves available to every piece
		let takeMoves: Move[] = []; //Only moves that involve taking another piece

		this.hideAllMarks(false, true) //Hide previous marks

		//Loop through board
		for (let i = 0; i < this._board.length; i++) {
			for (let j = 0; j < this._board[i].length; j++) {

				//If a piece is found in position i j of the given color
				if (this.isPiece(i, j, color)) {

					//Get and store possible moves for piece i j
					let moves: Move[] = this.getPossibleMoves({ row: i, col: j }, color);
					//Hide the marks that were created from the previous get
					this.hideAllMarks(true, false);
					//Store the possible moves
					possibleMoves = possibleMoves.concat(moves);

					//Store take moves 
					for (let k = 0; k < moves.length; k++) {
						if (moves[k].takenPiece) {
							takeMoves.push(moves[k]);
						}
					}
				}
			}
		}

		//Mark the tiles that can be moved
		//If there are take moves ignore the other possible moves
		if (takeMoves.length > 0) {
			for (let i = 0; i < takeMoves.length; i++) {
				this.getTile(takeMoves[i].fromPosition).canBeMoved = true;
			}
			return takeMoves;
		} else {
			for (let i = 0; i < possibleMoves.length; i++) {
				this.getTile(possibleMoves[i].fromPosition).canBeMoved = true;
				this._board[possibleMoves[i].fromPosition.row][possibleMoves[i].fromPosition.col].canBeMoved = true;
			}
			return possibleMoves;
		}
	}

	/**
	 * Remove availableToMove and/or canBeMoved marks on all tiles
	 */
	hideAllMarks(hideMove: boolean = true, hideCanBeMoved: boolean = true) {
		for (let i = 0; i < this._board.length; i++) {
			for (let j = 0; j < this._board[i].length; j++) {
				if (hideMove) this._board[i][j].availableToMove = false;
				if (hideCanBeMoved) this._board[i][j].canBeMoved = false;
			}
		}
	}

	/**
	 * Check if a tile exists and is empty
	 * @param row Row number of board
	 * @param col Col number of board
	 */
	availableToMove(row: number, col: number): boolean {
		return this._board[row] && this._board[row][col] && this._board[row][col].isEmpty;
	}

    /**
     * Check if a specific tile on board has a piece of specific color
     * @param row Row of piece
     * @param col Col of piece
     * @param color Color of piece
     */
	isPiece(row: number, col: number, color: PlayerColor): boolean {
		return this._board[row][col] && !this._board[row][col].isEmpty && this._board[row][col].color == color;
	}
}