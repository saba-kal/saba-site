import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  
  //The size of a mobile screen was gotten from flex-layout.
  //e.i. fxFlex.sm will apply to screens with min-width: 600px and max-width: 959px
  MOBILE_SCREEN_SIZE: number = 959;
  sidenavOpened: boolean = true;
  width: number;
  
  ngOnInit(): void {
    this.width = window.innerWidth;
    if (this.width < this.MOBILE_SCREEN_SIZE){
      this.sidenavOpened = false;
    } else {
      this.sidenavOpened = true;
    }
  }
  
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.width = window.innerWidth;
    if (this.width < this.MOBILE_SCREEN_SIZE){
      this.sidenavOpened = false;
    } else {
      this.sidenavOpened = true;
    }
  }
}
