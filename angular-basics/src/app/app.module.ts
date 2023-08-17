import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ButtonComponent } from './components/button/button.component';
import { HttpClientModule } from '@angular/common/http';
import { CatsService } from './services/cats.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    CatsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
