import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { TicTacToeComponent } from './components/tic-tac-toe/tic-tac-toe.component';
import { CheckersComponent } from './components/checkers/checkers.component';

const routes: Routes = [
  { path: '', redirectTo: 'about', pathMatch: 'full' },
  { path: 'about', component: AboutComponent},
  { path: 'tic-tac-toe', component: TicTacToeComponent},
  { path: 'checkers', component: CheckersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

export const routedComponents = [
  AppComponent,
  AboutComponent,
  TicTacToeComponent,
  CheckersComponent
];