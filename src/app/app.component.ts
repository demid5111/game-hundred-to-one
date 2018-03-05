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
  showAnswersMode: boolean;
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
    this.failsTeam1 = [1, 1, 1];
    this.failsTeam2 = [1, 1, 1];
    this.showAnswersMode = false;

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
    this.openedAnswers[id] = true;
    if (this.showAnswersMode) {
      return;
    }
    const award = +(this.answers[this.currentQuestionIdx].answers[id].quantity);
    if (this.activeTeam == 1) {
      this.pointsTeam1 += award;
      this.counterTeam1.innerHTML = this.pointsTeam1;
    } else {
      this.pointsTeam2 += award;
      this.counterTeam2.innerHTML = this.pointsTeam2;
    }

    const fails = this.activeTeam === 1 ? this.failsTeam2 : this.failsTeam1;
    if (this.isAnotherTeamBuffer(fails)) {
      // switch
      this.activeTeam = this.activeTeam === 1 ? 2 : 1;
    }
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
    return _.find(this.openedAnswers, (x) => x === false) === undefined;
  }

  private eraseAnswers() {
    const l = _.range(this.answers[this.currentQuestionIdx].answers.length);
    this.openedAnswers = _.map(l, (x) => false);
    this.showAnswersMode = false;
    this.failsTeam1 = [1, 1, 1];
    this.failsTeam2 = [1, 1, 1];
  }

  private onFailedAnswer(id) {
    if (this.activeTeam === 1) {
      this.failsTeam1[id] = 3;
    } else {
      this.failsTeam2[id] = 3;
    }
    const fails = this.activeTeam === 1 ? this.failsTeam1 : this.failsTeam2;
    const opponentsFails = this.activeTeam === 1 ? this.failsTeam2 : this.failsTeam1;
    // now check if another team has buffer
    if (this.isAnotherTeamBuffer(opponentsFails)) {
      // this means next step
      this.activeTeam = this.activeTeam === 1 ? 2 : 1;
    } else if (!this.isAnotherTeamBuffer(fails)) {
      this.showAnswersMode = true;
      this.activeTeam = this.activeTeam === 1 ? 2 : 1;
    }
  }

  private isAnotherTeamBuffer(fails) {
    // now check if another team has buffer
    const tries = _.reject(fails, (x) => x === 3);
    return tries.length > 0;
  }
}
