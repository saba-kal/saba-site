import { NgModule } from '@angular/core';
import { 
    MatButtonModule, 
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatGridListModule,
    MatListModule,
    MatCardModule
} from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule, 
        MatCheckboxModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatGridListModule,
        MatListModule,
        MatCardModule
    ],
    exports: [
        MatButtonModule, 
        MatCheckboxModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatGridListModule,
        MatListModule,
        MatCardModule
    ]
})
export class MaterialModule { }
