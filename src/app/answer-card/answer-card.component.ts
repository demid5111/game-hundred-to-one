import { Component, Input, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-answer-card',
  templateUrl: './answer-card.component.html',
  styleUrls: ['./answer-card.component.css'],
  animations: [
    trigger('flipState', [
      state('active', style({
        transform: 'rotateX(179deg)'
      })),
      state('inactive', style({
        transform: 'rotateX(0)'
      })),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in'))
    ])
  ]
})
export class AnswerCardComponent implements OnInit {
  @Input()
  answer: any;

  constructor() { }

  ngOnInit() {
    console.log(`Received answer ${this.answer.answer} [${this.answer.quantity}]`);
  }

  flip: string = 'inactive';

  toggleFlip() {
    this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
  }

}
