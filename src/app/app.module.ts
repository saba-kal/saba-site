import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

//Components
import { AppComponent } from './components/app.component';
import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { UnityComponent } from './components/unity/unity.component';
import { TicTacToeComponent } from './components/projects/tic-tac-toe/tic-tac-toe.component';
import { CheckersComponent } from './components/projects/checkers/checkers.component';
import { CheckersService } from './services/checkers.service';
import { TicTacToeService } from './services/tic-tac-toe.service';

@NgModule({
	declarations: [
		AppComponent,
		AboutComponent,
		ProjectsComponent,
		UnityComponent,
		TicTacToeComponent,
		CheckersComponent
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
