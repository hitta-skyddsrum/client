import { Component, Inject, Input } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';

@Component({
  templateUrl: './dialog.component.html'
})

export class DialogComponent {
  constructor(
    @Inject(MD_DIALOG_DATA) public data: any
  ) { }
}
