import { Component, OnInit } from '@angular/core';
import { GridCell, GameSymbol, TicTacToeService } from 'src/app/services/tic-tac-toe.service';

@Component({
	selector: 'tic-tac-toe',
	templateUrl: 'tic-tac-toe.component.html',
	styleUrls: ['tic-tac-toe.component.scss']
})

export class TicTacToeComponent implements OnInit {

	gameSymbol = GameSymbol; //Store reference to GameSymbol enum so we can use it in the template
	gameBoard: GridCell[][];
	player: GameSymbol = GameSymbol.X;
	opponent: GameSymbol = GameSymbol.O;
	lockBoard: boolean;
	message: string = "Click or tap any square to start playing";

	constructor(private _ticTacToeService: TicTacToeService) { }

	/**
	 * Component Initialization. The game board and active player are service
	 * based because it allows us to store the state of the board even if
	 * the user navigates away
	 */
	ngOnInit() {
		//Get board
		this.gameBoard = this._ticTacToeService.getBoard();
	}

	/**
	 * Change cell on click if it is empty. Then, let the AI make move
	 * @param row Row number
	 * @param col Column number
	 */
	onCellClick(row, col) {
		if (this.gameBoard[row][col].symbol == GameSymbol.EMPTY) {
			//Player makes move
			this.gameBoard[row][col].symbol = this.player;
			//Player won or no moves left
			if (this.checkWin() == 10 || !this.checkMovesLeft()) {
				this.lockBoard = true;
				this.checkWin(true); //Highlight winner
				return;
			}
			//AI makes move
			this.makeBestMove();
			//AI won or no moves left
			if (this.checkWin() == -10 || !this.checkMovesLeft()) {
				this.lockBoard = true;
				this.checkWin(true); //Highlight winner.
				return;
			}
		}
	}

	/**
	 * Make all grid cells empty
	 */
	resetBoard() {
		this._ticTacToeService.resetBoard();
		this.lockBoard = false;
		this.message = "Click or tap any square to start playing";
		//For some reason, the board does not automatically update. Subscriptions don't seem to work either
		//TODO: Figure out why and remove the line below
		this.gameBoard = this._ticTacToeService.getBoard();
	}

	/**
	 * Check for the win condition
	 * @param showResult highlight winning squares and indicate the winner in a message
	 */
	checkWin(showResult: boolean = false) {
		//Check row
		for (let i = 0; i < this.gameBoard.length; i++) {
			if (this.gameBoard[i][0].symbol == this.gameBoard[i][1].symbol &&
				this.gameBoard[i][1].symbol == this.gameBoard[i][2].symbol) {
				let winner = this.gameBoard[i][0].symbol
				if (showResult) {
					this.gameBoard[i][0].winner = true;
					this.gameBoard[i][1].winner = true;
					this.gameBoard[i][2].winner = true;
					this.message = "Game over. The winner is " + winner + ". Press reset to play again";
				}
				//Return state evaluation
				if (winner == this.player)
					return 10;
				else if (winner == this.opponent)
					return -10;
			}
		}
		//Check column
		for (let i = 0; i < this.gameBoard[0].length; i++) {
			if (this.gameBoard[0][i].symbol == this.gameBoard[1][i].symbol &&
				this.gameBoard[1][i].symbol == this.gameBoard[2][i].symbol) {
				let winner = this.gameBoard[0][i].symbol
				if (showResult) {
					this.gameBoard[0][i].winner = true;
					this.gameBoard[1][i].winner = true;
					this.gameBoard[2][i].winner = true;
					this.message = "Game over. The winner is " + winner + ". Press reset to play again";
				}
				if (winner == this.player)
					return 10;
				else if (winner == this.opponent)
					return -10;
			}
		}
		// 1st diagonal
		if (this.gameBoard[0][0].symbol == this.gameBoard[1][1].symbol &&
			this.gameBoard[1][1].symbol == this.gameBoard[2][2].symbol) {
			let winner = this.gameBoard[0][0].symbol
			if (showResult) {
				this.gameBoard[0][0].winner = true;
				this.gameBoard[1][1].winner = true;
				this.gameBoard[2][2].winner = true;
				this.message = "Game over. The winner is " + winner + ". Press reset to play again";
			}
			if (winner == this.player)
				return 10;
			else if (winner == this.opponent)
				return -10;
		}
		// 2nd diagonal
		if (this.gameBoard[0][2].symbol == this.gameBoard[1][1].symbol &&
			this.gameBoard[1][1].symbol == this.gameBoard[2][0].symbol) {
			let winner = this.gameBoard[0][2].symbol
			if (showResult) {
				this.gameBoard[0][2].winner = true;
				this.gameBoard[1][1].winner = true;
				this.gameBoard[2][0].winner = true;
				this.message = "Game over. The winner is " + winner + ". Press reset to play again";
			}
			if (winner == this.player)
				return 10;
			else if (winner == this.opponent)
				return -10;
		}
		//No one has won, so return 0
		if (showResult)
			this.message = "Tie game. Press reset to play again";
		return 0;
	}

	/**
	 * Check if there are any moves left on the board.
	 */
	checkMovesLeft() {
		for (let i = 0; i < this.gameBoard.length; i++) {
			for (let j = 0; j < this.gameBoard[i].length; j++) {
				if (this.gameBoard[i][j].symbol == GameSymbol.EMPTY) {
					return true;
				}
			}
		}
		return false;
	}

	/**
	 * Minimax function. Considers all moves and evaluates the value of the board
	 * @param depth The depth of each node in the game tree
	 * @param isMax Is it Max's or Min's move
	 */
	minimax(depth: number, isMax: boolean) {
		let score = this.checkWin();
		// Max won game
		if (score == 10) return score;
		// Min won game
		if (score == -10) return score;
		// Tie game
		if (!this.checkMovesLeft()) return 0;
		// Max's move
		if (isMax) {
			let best = -9999;
			// Traverse the board and make all possible moves
			for (let i = 0; i < this.gameBoard.length; i++) {
				for (let j = 0; j < this.gameBoard[i].length; j++) {
					if (this.gameBoard[i][j].symbol == GameSymbol.EMPTY) {
						//Make move
						this.gameBoard[i][j].symbol = this.player;
						//Recursively find maximum value
						best = Math.max(best, this.minimax(depth + 1, !isMax))
						//Undo move
						this.gameBoard[i][j].symbol = GameSymbol.EMPTY;
					}
				}
			}
			return best;
		}
		// Min's move
		if (!isMax) {
			let best = 9999;
			// Traverse the board and make all possible moves
			for (let i = 0; i < this.gameBoard.length; i++) {
				for (let j = 0; j < this.gameBoard[i].length; j++) {
					if (this.gameBoard[i][j].symbol == GameSymbol.EMPTY) {
						//Make move
						this.gameBoard[i][j].symbol = this.opponent;
						//Recursively find minimum value
						best = Math.min(best, this.minimax(depth + 1, !isMax))
						//Undo move
						this.gameBoard[i][j].symbol = GameSymbol.EMPTY;
					}
				}
			}
			return best;
		}
	}

	/**
	 * AI makes the best possible move
	 */
	makeBestMove() {
		let bestMove = 9999;
		let row = -1;
		let col = -1;
		//Traverse all cells on board
		for (let i = 0; i < this.gameBoard.length; i++) {
			for (let j = 0; j < this.gameBoard[i].length; j++) {
				if (this.gameBoard[i][j].symbol == GameSymbol.EMPTY) {
					//Make min's move on empty cell
					this.gameBoard[i][j].symbol = this.opponent;
					//Evaluate max's options
					let moveVal = this.minimax(0, true);
					//Undo move
					this.gameBoard[i][j].symbol = GameSymbol.EMPTY;
					console.log("Move Value (" + i + ", " + j + ") = " + moveVal + ", Best Move Value = " + bestMove);
					//If the moveVal is less than max's best move, update the best move
					//We want to minimize max's ability to win
					if (moveVal < bestMove) {
						bestMove = moveVal;
						row = i;
						col = j;
					}
				}
			}
		}
		//Make the move
		this.gameBoard[row][col].symbol = this.opponent;
	}
}