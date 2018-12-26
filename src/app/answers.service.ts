import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AnswersService {
  public round: number;
  private apiUrl: string;
  private file: string;
  private method: string;

  constructor(private http: HttpClient) {
    this.http.get('/assets/answers/config.json').subscribe(configAPI => {
      this.apiUrl = configAPI['apiUrl'];
      this.file = configAPI['file'];
      this.method = configAPI['method'];
    });
  }

  public getAnswers() {
    if (this.method === 'server') {
      return this.http.get(this.apiUrl + '?round=' + this.round);
    } else {
      return this.http.get(this.apiUrl + '/' + this.file + '?round=' + this.round);
    }
  }
}
