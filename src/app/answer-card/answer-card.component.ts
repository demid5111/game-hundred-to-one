import { Component, EventEmitter, Input, Output } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-answer-card',
  templateUrl: './answer-card.component.html',
  styleUrls: ['./answer-card.component.css'],
  animations: [
    trigger('flipState', [
      state('active', style({
        transform: 'rotateY(179deg)'
      })),
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      transition('active => inactive', animate('400ms ease-out')),
      transition('inactive => active', animate('400ms ease-in'))
    ])
  ]
})
export class AnswerCardComponent{
  @Input()
  answer: any;

  @Input()
  id: number;

  @Output()
  answeredCb : EventEmitter<any> = new EventEmitter();

  flip: string = 'inactive';
  guessMe: string = 'Отгадай-ка!';

  toggleFlip() {
    this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
    this.answeredCb.emit(this.id);
  }
}
