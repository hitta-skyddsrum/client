import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'bouncer',
  templateUrl: 'bouncer.component.html',
  styleUrls: ['bouncer.component.scss']
})

export class BouncerComponent {

  @Input() public bounceIf: boolean = false;
  @Input() public textValue: string;

}
