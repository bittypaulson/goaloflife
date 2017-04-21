import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './home.component';

import { GridComponent } from './../../components/grid/grid.component';

@NgModule({
    declarations: [HomeComponent, GridComponent],
    exports: [HomeComponent],
    imports: [BrowserModule, FormsModule]
})
export class HomeModule { }

