import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AnswersService {
  private answers: any;
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = '/assets/answers/answers.json';

    this.getAnswers()
      .subscribe((res) => this.answers = res);
  }

  public getAnswers() {
    return this.http.get(this.apiUrl);
  }
}
