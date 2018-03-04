import { Component, OnInit } from '@angular/core';
import * as o from '../../node_modules/odometer/odometer.js';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  question: string;
  answers: any;
  activeTeam: number;
  title:string;
  counterTeam1: any;
  counterTeam2: any;
  teamOneIcon: string;
  teamTwoIcon: string;
  placeholder: string;
  currentQuestion: string;

  ngOnInit() {
    this.teamOneIcon = '/assets/images/3.png';
    this.teamTwoIcon = '/assets/images/5.png';
    this.placeholder = 'Вопрос: ';
    this.currentQuestion = 'Кто следующий?';
    this.counterTeam1 = this.createOdometer('#odometer1');
    this.counterTeam2 = this.createOdometer('#odometer2');

    setTimeout(() => this.counterTeam1.innerHTML = '456', 3000);
    setTimeout(() => this.counterTeam2.innerHTML = '456', 3000);
  }

  constructor() {
    this.title = "Игра: 100-к-1. Шутки про рутину и не только...";
    this.question = "What is bingo?";
    this.activeTeam = 2;
    this.answers = [
      {
        answer: "Answer 1",
        quantity: 56,
      },
      {
        answer: "Answer 2",
        quantity: 14,
      },
      {
        answer: "Answer 3",
        quantity: 12,
      },
      {
        answer: "Answer 4",
        quantity: 4,
      },
      {
        answer: "Answer 5",
        quantity: 1
      },
    ];
  }

  public isFirstTeamVisible() {
    return this.activeTeam == 1;
  }

  public isFirstTeamInVisible() {
    return this.activeTeam != 1;
  }

  private createOdometer(id){
    const trueOdometer = _.get(window, 'Odometer');
    const el = document.querySelector(id);

    const od = new trueOdometer({
      el: el,
      value: 100,

      // Any option (other than auto and selector) can be passed in here
      format: 'd',
      theme: 'slot-machine'
    });

    return el;
  }
}
