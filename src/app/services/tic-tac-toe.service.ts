import { Injectable } from '@angular/core';

export enum GameSymbol {
	EMPTY = 'Empty',
	X = 'X',
	O = 'O'
}

export interface GridCell {
	symbol: GameSymbol,
	winner: boolean
}

/**
 * This service is used to ensure that the game state is saved when the user
 * navigates to a different page on the app
 */
@Injectable()
export class TicTacToeService {

	board: GridCell[][] = [];

	constructor() {
		//Set up board
		for (let i = 0; i < 3; i++) {
			this.board.push([]);
			for (let j = 0; j < 3; j++) {
				this.board[i].push({ symbol: GameSymbol.EMPTY, winner: false });
			}
		}
	}

	/**
	 * Get the current board state. Changes made to the board outside of this 
	 * service persist, so a set function is not needed
	 */
	getBoard(): GridCell[][] {
		return this.board
	}

	/**
	 * Reset the board. NOTE: getBoard() will need to be called again because
	 * the board state does not get automatically updated outside of this service
	 */
	resetBoard() {
		this.board = [];
		for (let i = 0; i < 3; i++) {
			this.board.push([]);
			for (let j = 0; j < 3; j++) {
				this.board[i].push({ symbol: GameSymbol.EMPTY, winner: false });
			}
		}
	}
}