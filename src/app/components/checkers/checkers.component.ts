import { Component, OnInit} from '@angular/core';
import { CheckersService } from '../../services/checkers/checkers.service';

@Component({
    selector: 'checkers',
    templateUrl: 'checkers.component.html',
    styleUrls: ['checkers.component.css']
})

export class CheckersComponent implements OnInit {

    constructor(private _checkersService: CheckersService) { }

    ngOnInit() {  }

}