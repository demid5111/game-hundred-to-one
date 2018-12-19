import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { AnswersService } from './answers.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  winnerTeamId: number;
  gameEnded: boolean;
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
  showFireworks: boolean;
  gameStarted: boolean;
  isSoundOn: boolean;
  private openedAnswers: boolean[];
  private startActiveTeam: number;
  private audioFail: HTMLAudioElement;
  private audioFlip: HTMLAudioElement;
  private audioCash: HTMLAudioElement;
  private audioWin: HTMLAudioElement;

  ngOnInit() {
    this.isSoundOn = false;
    this.teamOneIcon = '/assets/images/red.svg';
    this.teamTwoIcon = '/assets/images/blue.svg';
    this.backIcon = '/assets/images/back.svg';
    this.nextIcon = '/assets/images/next.svg';
    this.placeholder = 'Ответ';
    this.pointsTeam1 = 0;
    this.pointsTeam2 = 0;
    this.failsTeam1 = [1, 1, 1];
    this.failsTeam2 = [1, 1, 1];
    this.showAnswersMode = false;
    this.showFireworks = false;
    this.gameStarted = false;
    this.startActiveTeam = this.activeTeam;

    this.initSounds();

  }

  constructor(private answersService: AnswersService) {
    this.title = 'Тхис баттл';
    this.activeTeam = 1;
    this.currentQuestionIdx = 0;
  }

  public isFirstTeamVisible() {
    return this.activeTeam === 1;
  }

  public switchSound() {
    this.isSoundOn = !this.isSoundOn;
  }

  public isWinner(id) {
    return this.activeTeam === id || this.activeTeam === 3;
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
    //const addition = `${question.indexOf('?') !== -1 ? '' : '?'}`;
    //return `${this.placeholder} ${this.currentQuestionIdx + 1}: ${question}${addition}`;
    return `${question}`;
  }

  private onSelected(id: number) {
    this.openedAnswers[id] = true;
    this.playFlipSound();
    this.playCashSound();
    if (this.showAnswersMode) {
      return;
    }
    const award = +(this.answers[this.currentQuestionIdx].answers[id].quantity);
    if (this.activeTeam === 1) {
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
    if (this.currentQuestionIdx === this.answers.length - 1
      && (this.isNextBtnEnabled() ||
        (this.isAnotherTeamBuffer(this.failsTeam1)
          && this.isAnotherTeamBuffer(this.failsTeam2)))) {
      this.showFireworks = true;
      this.activeTeam = this.pointsTeam1 > this.pointsTeam2 ? 1
        : this.pointsTeam1 === this.pointsTeam2 ? 1 : 2;
      this.gameEnded = true;
      this.winnerTeamId = this.pointsTeam1 > this.pointsTeam2 ? 1 : 2;
      console.log(this.isWinner(1));
      this.playWinSound();
      return;
    } else if (this.currentQuestionIdx === this.answers.length - 1) {
      return;
    } else if (!this.isNextBtnEnabled()) {
      return;
    }
    this.currentQuestionIdx += 1;
    const newTeam = this.activeTeam === 1 ? 2 : 1;
    if (this.activeTeam === this.startActiveTeam) {
      this.activeTeam = this.activeTeam === 1 ? 2 : 1;
      this.startActiveTeam = this.activeTeam;
    }
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

  private onFailedAnswer(id, sourceTeam) {
    if (this.activeTeam !== sourceTeam) {
      return;
    }

    this.playFailSound();

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

  private playFailSound() {
    if (this.isSoundOn)
      this.audioFail.play();
  }

  private playFlipSound() {
    if (this.isSoundOn)
      this.audioFlip.play();
  }

  private playCashSound() {
    if (this.isSoundOn)
      this.audioCash.play();
  }

  private playWinSound() {
    if (this.isSoundOn)
      this.audioWin.play();
  }

  private initSounds() {
    this.audioFail = new Audio();
    this.audioFail.src = '/assets/sounds/fail.mp3';
    this.audioFail.load();
    this.audioFail.playbackRate = 2.5;

    this.audioFlip = new Audio();
    this.audioFlip.src = '../../../assets/sounds/turn.mp3';
    this.audioFlip.load();

    this.audioCash = new Audio();
    this.audioCash.src = '../../../assets/sounds/cash.wav';
    this.audioCash.load();
    this.audioCash.playbackRate = 2.5;

    this.audioWin = new Audio();
    this.audioWin.src = '../../../assets/sounds/win.mp3';
    this.audioWin.load();
  }

  private isAnotherTeamBuffer(fails) {
    // now check if another team has buffer
    const tries = _.reject(fails, (x) => x === 3);
    return tries.length > 0;
  }

  private startGame(Round) {
    this.answersService.round = Round;
    this.answersService.getAnswers()
      .subscribe((res) => {
        this.answers = res;
        this.eraseAnswers();
      });
    setTimeout(() => {
      this.gameStarted = true;
      setTimeout(() => {
        this.counterTeam1 = this.createOdometer('#odometer1');
        this.counterTeam2 = this.createOdometer('#odometer2');
      });

    }, 1000);
  }
}
