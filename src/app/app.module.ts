import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

//Services
import { CheckersService } from './services/checkers.service';
import { TicTacToeService } from './services/tic-tac-toe.service';

//Components
import { AppComponent } from './components/app.component';
import { AboutComponent } from './components/about/about.component';
import { MiniGamesComponent } from './components/mini-games/mini-games.component';
import { UnityComponent } from './components/unity/unity.component';
import { TicTacToeComponent } from './components/mini-games/tic-tac-toe/tic-tac-toe.component';
import { CheckersComponent } from './components/mini-games/checkers/checkers.component';
import { ImageLoaderComponent } from './components/common/image-loader/image-loader.component';

@NgModule({
	declarations: [
		AppComponent,
		AboutComponent,
		MiniGamesComponent,
		UnityComponent,
		TicTacToeComponent,
		CheckersComponent,
		ImageLoaderComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FontAwesomeModule
	],
	providers: [
		TicTacToeService,
		CheckersService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
