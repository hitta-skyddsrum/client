import { Component, Input, HostBinding } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'bouncer',
  templateUrl: 'bouncer.component.html',
  styleUrls: ['bouncer.component.css']
})


export class BouncerComponent {

  @Input() bounceIf: boolean = false;
  @Input() textValue: string;

}

