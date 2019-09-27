import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-indicator',
    styleUrls: ['indicator.component.css'],
    templateUrl: './indicator.component.html'
})

export class IndicatorComponent {
    @Input()
    private indicatorColor: number[];

    @Output()
    private failedAnswerCb: EventEmitter<any> = new EventEmitter();

    public getIndicatorClassName(id: number): string {
        return indicatorClassNameMap.get(this.indicatorColor[id]);
    }

    public onFailed(id: number) {
      if (this.indicatorColor[id] === 3) {
        return;
      }
      this.failedAnswerCb.emit(id);
    }
}

const indicatorClassNameMap = new Map<number, string>([
    [1, 'indicator-green circle'],
    [2, 'indicator-yellow circle'],
    [3, 'indicator-red circle']
]);
