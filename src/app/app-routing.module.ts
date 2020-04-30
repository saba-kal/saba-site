import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { MiniGamesComponent } from './components/mini-games/mini-games.component';
import { UnityComponent } from './components/unity/unity.component';


const routes: Routes = [
	{ path: '', component: AboutComponent },
	{ path: 'about', component: AboutComponent },
	{ path: 'mini-games', component: MiniGamesComponent },
	{ path: 'unity', component: UnityComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
