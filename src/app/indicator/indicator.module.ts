import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IndicatorComponent } from './indicator.component';
// import { IndicatorService } from './indicator.service';

@NgModule({
    imports: [
        FormsModule,
    ],
    exports: [
        IndicatorComponent,
    ],
    declarations: [
        IndicatorComponent,
    ],
    providers: [],
    entryComponents: [
        IndicatorComponent,
    ],
})
export class IndicatorModule { }
