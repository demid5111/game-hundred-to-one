import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AnswersService {
  public round: number;
  private answers: any;
  private apiUrl: string;

  constructor(private http: HttpClient) {

  }

  public getAnswers() {
    this.apiUrl = '/assets/answers/answers.json?round='+this.round;
    console.log(this.apiUrl);
    return this.http.get(this.apiUrl);
  }
}
