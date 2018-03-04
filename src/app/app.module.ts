import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AnswerCardComponent } from './answer-card/answer-card.component';
import { IndicatorComponent } from './indicator/indicator.component';


@NgModule({
  declarations: [
    AppComponent,
    AnswerCardComponent,
    IndicatorComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
