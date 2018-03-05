import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { AnswersService } from './answers.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  answers: any;
  activeTeam: number;
  title: string;
  counterTeam1: any;
  counterTeam2: any;
  teamOneIcon: string;
  teamTwoIcon: string;
  backIcon: string;
  nextIcon: string;
  placeholder: string;
  currentQuestionIdx: number;
  pointsTeam1: number;
  pointsTeam2: number;
  failsTeam1: number[];
  failsTeam2: number[];
  private openedAnswers: boolean[];

  ngOnInit() {
    this.teamOneIcon = '/assets/images/3.png';
    this.teamTwoIcon = '/assets/images/5.png';
    this.backIcon = '/assets/images/back.png';
    this.nextIcon = '/assets/images/next.png';
    this.placeholder = 'Вопрос';
    this.counterTeam1 = this.createOdometer('#odometer1');
    this.counterTeam2 = this.createOdometer('#odometer2');
    this.pointsTeam1 = 0;
    this.pointsTeam2 = 0;
    this.failsTeam1 = [1,1,1];
    this.failsTeam2 = [1,1,1];

    this.answersService.getAnswers()
      .subscribe((res) => {
        this.answers = res;
        this.eraseAnswers();
      });
  }

  constructor(private answersService: AnswersService) {
    this.title = "Игра: 100-к-1. Шутки про рутину и не только...";
    this.activeTeam = 1;
    this.currentQuestionIdx = 0;
  }

  public isFirstTeamVisible() {
    return this.activeTeam == 1;
  }

  public isFirstTeamInVisible() {
    return this.activeTeam != 1;
  }

  private createOdometer(id) {
    const trueOdometer = _.get(window, 'Odometer');
    const el = document.querySelector(id);

    const od = new trueOdometer({
      el: el,
      value: this.pointsTeam1,

      // Any option (other than auto and selector) can be passed in here
      format: 'd',
      theme: 'slot-machine'
    });

    return el;
  }

  private getCurrentAnswer(idx) {
    return this.answers[this.currentQuestionIdx].answers[idx];
  }

  private getCurrentQuestion() {
    const question = this.answers[this.currentQuestionIdx].question;
    const addition = `${question.indexOf('?') != -1 ? '' : '?'}`;
    return `${this.placeholder} ${this.currentQuestionIdx + 1}: ${question}${addition}`;
  }

  private onSelected(id: number) {
    const award = +(this.answers[this.currentQuestionIdx].answers[id].quantity);
    if (this.activeTeam == 1) {
      this.pointsTeam1 += award;
      this.activeTeam = 2;
      this.counterTeam1.innerHTML = this.pointsTeam1;
    } else {
      this.pointsTeam2 += award;
      this.activeTeam = 1;
      this.counterTeam2.innerHTML = this.pointsTeam2;
    }
    this.openedAnswers[id] = true;
  }

  private nextQuestion() {
    if (this.currentQuestionIdx === this.answers.length - 1) {
      return;
    } else if (!this.isNextBtnEnabled()) {
      return;
    }
    this.currentQuestionIdx += 1;
    this.eraseAnswers();
  }

  private previousQuestion() {
    if (this.currentQuestionIdx === 0) {
      return;
    }
    this.currentQuestionIdx -= 1;
  }

  private isNextBtnEnabled() {
    return _.find(this.openedAnswers, false) === undefined;
  }

  private eraseAnswers() {
    const l = _.range(this.answers[this.currentQuestionIdx].answers.length);
    this.openedAnswers = _.map(l, (x) => false);
  }
}
