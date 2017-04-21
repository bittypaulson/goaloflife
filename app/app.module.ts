import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';

// Header
import { HeaderComponent } from './shared/header/header.component';
// Footer
import { FooterComponent } from './shared/footer/footer.component';
// Home
import { HomeModule } from './modules/home/home.module';
// Routes
import { Routing } from './app.routes';

// Additional libs

@NgModule({
    imports:      [ BrowserModule, HomeModule, Routing ],
    declarations: [ AppComponent, HeaderComponent, FooterComponent],
    providers: [],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
