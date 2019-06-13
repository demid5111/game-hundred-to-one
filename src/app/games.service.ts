import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class GamesService {
  public round: number;
  private apiUrl: string;
  private saveUrl: string;
  private file: string;
  private method: string;
  private httpOptions: any;

  constructor(private http: HttpClient) {
    this.http.get('/assets/answers/config.json').subscribe(configAPI => {
      this.apiUrl = configAPI['apiUrl'];
      this.file = configAPI['file'];
      this.method = configAPI['method'];
    });
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  public getGames() {
      return this.http.get(this.apiUrl + '/games');
  }

  public getGame(num: number) {
    return this.http.get(this.apiUrl + '/game')
  }

  public saveGame(game: any) {
    return this.http.post(this.apiUrl + '/game', game)
  }

  public updateGame(id: number, game: any) {
    return this.http.put(this.apiUrl + '/game/' + id, game)
  }

  public deleteGame(id: number) {
    return this.http.delete(this.apiUrl + '/game/' + id)
  }

  /*public saveQuestions(games: any) {
    return this.http.post(this.saveUrl, questions, this.httpOptions);
  }*/
}
