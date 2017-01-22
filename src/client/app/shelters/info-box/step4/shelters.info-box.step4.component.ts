import {Router, ActivatedRoute} from "@angular/router";
declare var swal: any;

import {Component, AfterContentInit, OnInit, AfterViewInit, NgZone, ViewEncapsulation} from '@angular/core';
import {SheltersUserStateService} from "../../user-state/shelters.user-state.service";
import {Location} from "@angular/common";

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  templateUrl: 'shelters.info-box.step4.component.html',
  styleUrls: ['shelters.info-box.step4.component.css']
})

export class SheltersInfoBoxStep4Component {
  shelter: any;
  facebookShareUrl: string = 'https://www.facebook.com/dialog/share?app_id=299962093491323&display=popup&href='
  twitterShareUrl: string = 'https://twitter.com/intent/tweet?text=';

  constructor(
    private sheltersUserStateService: SheltersUserStateService,
    private activatedRoute: ActivatedRoute
  ) {
    this.sheltersUserStateService.setCurrentStep(4);
  }

  ngOnInit() {
    this.facebookShareUrl += window.location.href;
    this.twitterShareUrl += window.location.href;
  }

  openShareDialog() {
    swal({
      html:
      '<div class="sb-container">' +
      '<div class="sb-buttons sb-default-style">' +
      '<div class="sb-button">' +
      '<button class="facebook" onclick="window.open(\'' + this.facebookShareUrl + '\', \'fbShareWindow\', \'height=450, width=550, top=200, left=200, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0\');">' +
      '<i class="fa fa-facebook"></i>' +
      '</button>' +
      '</div>' +
      '<div class="sb-button">' +
      '<button class="twitter" onclick="window.open(\'' + this.twitterShareUrl + '\', \'fbShareWindow\', \'height=450, width=550, top=200, left=200, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0\');">' +
      '<i class="fa fa-twitter"></i>' +
      '</button>' +
      '</div>' +
      '</div>' +
      '</div>',
      title: 'Sprid ordet!',
    });
  }
}