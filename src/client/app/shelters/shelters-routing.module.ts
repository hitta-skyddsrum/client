import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SheltersComponent } from './shelters.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'skyddsrum', component: SheltersComponent }
        ])
    ],
    exports: [RouterModule]
})
export class SheltersRoutingModule { }
