import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class AnswersService {
  public round: number;
  private answers: any;
  private apiUrl: string;

  constructor(private http: HttpClient) {

  }

  /*public getAnswers() {
    //uncomment this code to use api instead file answers.json
    //this.apiUrl = 'http://it.shadowhd.ru:10000/answers?round='+this.round;
    //this.apiUrl = 'http://it.shadowhd.ru:10000/answers';
    this.apiUrl = '/assets/answers/answers.json';
	
	console.log(this.http.get(this.apiUrl))
	
    return this.http.get(this.apiUrl);
  } */
}
