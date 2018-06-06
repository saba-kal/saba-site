import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Services
import { TicTacToeService } from './services/tic-tac-toe.service';
import { CheckersService } from './services/checkers/checkers.service';

//Base component
import { AppComponent } from './app.component';

//Routing and components
import { AppRoutingModule, routedComponents } from './app.routing';

//Angular material modules, FlexLayout, and other theme libraries
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    routedComponents
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [
    TicTacToeService,
    CheckersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
