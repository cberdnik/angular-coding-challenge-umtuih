import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app.routing.module';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './header/header.component';
import { APP_BASE_HREF } from '@angular/common';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
  ],
  providers: [{provide: APP_BASE_HREF, useValue : '/' }],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
