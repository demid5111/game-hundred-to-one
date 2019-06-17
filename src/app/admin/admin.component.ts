import { Component, OnInit } from '@angular/core';
import { GamesService} from '../games.service';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  games: any;
  newgame: any = {
    desc: '',
    firstQuestion: {
      text: '',
      answers: []
    },
    doubleQuestion: {
      text: '',
      answers: []
    },
    inversedQuestion: {
      text: '',
      answers: []
    }
  };
  firstAnswer: any = { text: '', score: 0 };
  doubleAnswer: any = { text: '', score: 0 };
  inversedAnswer: any = { text: '', score: 0 };

  constructor(private gamesService: GamesService) {
  }

  ngOnInit() {
    this.gamesService.getGames().subscribe(
      res => {
        this.games = res;
      }
    );
  }

  private removeFromFirstQuestion(a: any) {
    this.newgame.firstQuestion.answers = this.newgame.firstQuestion.answers.filter(obj =>  obj !== a);
  }

  private removeFromDoubleQuestion(a: any) {
    this.newgame.doubleQuestion.answers = this.newgame.doubleQuestion.answers.filter(obj =>  obj !== a);
  }

  private removeFromInversedQuestion(a: any) {
    this.newgame.inversedQuestion.answers = this.newgame.inversedQuestion.answers.filter(obj =>  obj !== a);
  }

  private addFirstAnswer() {
    this.newgame.firstQuestion.answers.push({ text: this.firstAnswer.text, score: this.firstAnswer.score });
  }

  private addDoubleAnswer() {
    this.newgame.doubleQuestion.answers.push({ text: this.doubleAnswer.text, score: this.doubleAnswer.score });
  }

  private addInversedAnswer() {
    this.newgame.inversedQuestion.answers.push({ text: this.inversedAnswer.text, score: this.inversedAnswer.score });
  }

  private updateGame(id: number) {

  }

  private deleteGame(game: any) {
    this.gamesService.deleteGame(game.id).subscribe(res => {
      this.gamesService.getGames().subscribe(res => { this.games = res; });
    });
  }
  
  private createGame() {
    this.gamesService.saveGame(this.newgame).subscribe(res => {
      this.gamesService.getGames().subscribe(
        res => {
          this.games = res;
        }
      );
    });
  }

}
