import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AnswersService {
  public round: number;
  private answers: any;
  private apiUrl: string;
  private exampleFile: string;

  constructor(private http: HttpClient) {
    this.http.get('/assets/answers/config.json').subscribe(configAPI => {
      this.apiUrl = configAPI['apiUrl'];
      this.exampleFile = configAPI['method'];
    });
  }

  public getAnswers() {
    return this.http.get(this.apiUrl + '/' + this.exampleFile + '?round=' + this.round);
  }
}
