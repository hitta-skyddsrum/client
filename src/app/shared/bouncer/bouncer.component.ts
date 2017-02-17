import { Component, Input, HostBinding } from '@angular/core';

@Component({

  selector: 'bouncer',
  templateUrl: 'bouncer.component.html',
  styleUrls: ['bouncer.component.scss']
})


export class BouncerComponent {

  @Input() bounceIf: boolean = false;
  @Input() textValue: string;

}

