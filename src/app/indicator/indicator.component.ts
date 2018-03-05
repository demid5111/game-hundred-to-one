import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-indicator',
    styleUrls: ['indicator.component.css'],
    templateUrl: './indicator.component.html'
})

export class IndicatorComponent {
    @Input()
    private indicatorColor: number[];

    public getIndicatorClassName(id: number): string {
        return indicatorClassNameMap.get(this.indicatorColor[id]);
    }
}

const indicatorClassNameMap = new Map<number, string>([
    [1, 'indicator-green circle'],
    [2, 'indicator-yellow circle'],
    [3, 'indicator-red circle']
]);
