import { Component, OnInit} from '@angular/core';
import { CheckersService } from '../../services/checkers/checkers.service';

@Component({
    selector: 'checkers',
    templateUrl: 'checkers.component.html',
    styleUrls: ['checkers.component.css']
})

export class CheckersComponent implements OnInit {

    activePlayer: any;

    constructor(private _checkersService: CheckersService) { }

    ngOnInit() { 
        this.activePlayer = this._checkersService.activePlayer;
    }

    getAllTiles(row: number, col: number){
        return this._checkersService.getAllTiles();
    }

    moveTo(row: number, col: number){
        this._checkersService.moveTo(row, col);
    }

    gamePieceClick(row: number, col: number){
        this._checkersService.gamePieceClick(row, col);
    }

}