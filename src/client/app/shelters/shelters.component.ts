declare var google: any;

import {Component, OnInit, OnChanges} from '@angular/core';
import {ApiService, Shelter} from '../shared/api/api.service';
import {GeolocationService} from '../shared/geolocation/geolocation.service';
import {Observable} from "rxjs/Observable";

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'map',
  templateUrl: 'shelters.component.html',
  styleUrls: ['shelters.component.css'],
})
export class SheltersComponent implements OnInit {

  newName: string = '';
  errorMessage: string;
  shelters: any[] = [];
  map: any;
  selectedShelter: Shelter;
  selectedShelterMarker: any;
  shelterMarkers: any[];

  /**
   * Creates an instance of the SheltersComponent with the injected
   * ApiService.
   *
   * @param {ApiService} apiService - The injected ApiService.
   */
  constructor(public apiService: ApiService, public geoLocation: GeolocationService) {
  }

  /**
   * Get the shelters OnInit
   */
  ngOnInit() {
    this.getPosition().subscribe(location => {
      this.getShelters(location.coords).subscribe(
        result => this.writeMap(location.coords)
      );
    });
  }

  private writeMap(coordinates: Coordinates) {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;

    console.log(coordinates.longitude.valueOf());
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: {lat: coordinates.latitude.valueOf(), lng: coordinates.longitude.valueOf()}
    });

//    directionsDisplay.setMap(map);
//    calculateAndDisplayRoute(directionsService, directionsDisplay);

    function calculateAndDisplayRoute(directionsService, directionsDisplay) {

      var waypts = [];
      var checkboxArray:any[] = [
        'winnipeg', 'regina','calgary'
      ];
      for (var i = 0; i < checkboxArray.length; i++) {

        waypts.push({
          location: checkboxArray[i],
          stopover: true
        });

      }

      directionsService.route({
        origin: {lat: directionsDisplay.lat, lng: directionsDisplay.lng},
        destination: {lat: 49.3, lng: -123.12},
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: 'DRIVING'
      }, function(response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    }
  }

  private plotShelters() {
    // Create all the markers
    for(var i=0;i<this.shelters.length;i++) {
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(this.shelters[i].lat, this.shelters[i].long),
        map: this.map,
        icon: {
          url: '/assets/images/icon-shelter.png',
          scaledSize: new google.maps.Size(30, 30)
        }
      });

      this.setShelterMarkerEventData(this.shelters[i], marker);
      this.shelterMarkers.push(marker);
    }
  }

  private setShelterMarkerEventData(shelter: Shelter, marker: any ) {
    var _shelterComponent = this;

    google.maps.event.addListener(marker, 'click', function(event) {
      // If there's a selected shelter, reset the size of it
      if( typeof _shelterComponent.selectedShelterMarker !== 'undefined' ) {
        var icon = this.selectedShelterMarker.icon;
        icon.scaledSize.width = 29;
        icon.scaledSize.height = 30;
        _shelterComponent.selectedShelterMarker.setIcon(icon);
      }

      // Set the new selected shelter
      _shelterComponent.selectedShelterMarker = this;

      // Set the icon size
      var icon = _shelterComponent.selectedShelterMarker.icon;
      icon.scaledSize.width = 58;
      icon.scaledSize.height = 60;
      _shelterComponent.selectedShelterMarker.setIcon(icon);

      // Set selected for the UI
      _shelterComponent.selectedShelter = shelter;

      // Write path
//      findClosestPath($scope.currentPosition, this.position, false);
    });
  }

  getPosition() {
    return this.geoLocation.getLocation({});
  }

  /**
   * Handle the apiService observable
   */
  getShelters(coordinates: Coordinates) {
    return Observable.create(observer => {
      this.apiService.getShelters(coordinates)
        .subscribe(
          shelters => {
            this.shelters = shelters;
            observer.next();
          }
        );
    })
  }

  /**
   * Pushes a new name onto the names array
   * @return {boolean} false to prevent default form submit behavior to refresh the page.
   */
  addName(): boolean {
    // TODO: implement apiService.post
    this.shelters.push(this.newName);
    this.newName = '';
    return false;
  }

}
