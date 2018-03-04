import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-indicator',
    styleUrls: ['indicator.component.css'],
    templateUrl: './indicator.component.html'
})

export class IndicatorComponent {

    @Input()
    private indicatorColor: number;

    public getIndicatorClassName(): string {
        return indicatorClassNameMap.get(this.indicatorColor);
    }
}

const indicatorClassNameMap = new Map<number, string>([
    [1, 'indicator-green'],
    [2, 'indicator-yellow'],
    [3, 'indicator-red']
]);
