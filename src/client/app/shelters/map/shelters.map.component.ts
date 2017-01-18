declare var google: any;
declare var MarkerClusterer: any;

import {Component} from '@angular/core';
import {Shelter} from '../../shared/api';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'shelters-map',
  templateUrl: 'shelters.map.component.html',
  styleUrls: ['shelters.map.component.css'],
})

export class SheltersMapComponent {
  map: any;
  directionsDisplay: any;
  selectedShelter: Shelter;
  selectedShelterMarker: any;
  shelterMarkers: any[] = [];
  markerClusterer: any;

  writeMap(coordinates: Coordinates) {
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: {lat: coordinates.latitude.valueOf(), lng: coordinates.longitude.valueOf()}
    });

    this.directionsDisplay = new google.maps.DirectionsRenderer();
    this.directionsDisplay.setMap(this.map);
    this.directionsDisplay.setOptions({
      suppressMarkers: true
    });
  }

  private findClosestMarker(origin: any, markerArray: any[]) {
    let lat = origin.lat();
    let lng = origin.lng();
    var R = 6371; // radius of earth in km
    var distances: any[] = [];
    var closest = -1;
    function rad(x: number) {return x*Math.PI/180;}

    for(var i=0;i<markerArray.length; i++ ) {
      let mLat = markerArray[i].getPosition().lat();
      let mLng = markerArray[i].getPosition().lng();
      let dLat  = rad(mLat - lat);
      let dLong = rad(mLng - lng);
      let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(rad(lat)) * Math.cos(rad(lat)) * Math.sin(dLong/2) * Math.sin(dLong/2);
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      let d = R * c;
      distances[i] = d;
      if ( closest == -1 || d < distances[closest] ) {
        closest = i;
      }
    }

    return closest;
  }

  public plotShelters(shelters: Shelter[]) {
    // Create all the markers
    for(var i=0;i<shelters.length;i++) {
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(shelters[i].position.lat, shelters[i].position.long),
        map: this.map,
        icon: {
          url: '/assets/images/icon-shelter.png',
          scaledSize: new google.maps.Size(30, 30)
        }
      });

      this.setShelterMarkerEventData(shelters[i], marker);
      this.shelterMarkers.push(marker);
    }

    this.markerClusterer = new MarkerClusterer(this.map, this.shelterMarkers, {
      enableRetinaIcons: false,
      maxZoom: 15,
      imagePath: '/assets/images/icon-shelter-cluster',
      imageExtension: 'png'
    });

    google.maps.event.addListener(this.markerClusterer, 'clusteringbegin', function(markerClusterer: any) {
      console.log('nu börjar vi!', markerClusterer);
    });

    google.maps.event.addListener(this.markerClusterer, 'clusteringend', function(markerClusterer: any) {
      console.log('nu slutar vi!', markerClusterer);
    });

    this.markClosestShelter();
  }

  private markClosestShelter()
  {
    // Find the closest marker
    var closestShelter = this.findClosestMarker(this.map.getCenter(), this.shelterMarkers);
    // And select it
    google.maps.event.trigger(this.shelterMarkers[closestShelter], 'click');
  }


  // Find the closest path to given destination
  private findClosestPath(origin: any, destination: any, preserveViewport: boolean, travelMode: any) {
    let directionsService = new google.maps.DirectionsService;
    var _shelterComponent = this;

    // If travelMode isnt set, lets set it to WALKING
    if( typeof travelMode === 'undefined' ) {
      travelMode = google.maps.TravelMode['WALKING'];
    }

    // Prepare request to get the route for the closest route
    var request = {
      origin: origin,
      destination: destination,
      travelMode: travelMode,
      optimizeWaypoints: true
    };

    console.log('origin', origin);

    // Request the route
    directionsService.route(request, function(response: any, status: any) {
      console.log('google.maps.DirectionsStatus.OK', status);

      switch (status) {
        case google.maps.DirectionsStatus.REQUEST_DENIED:
          break;
        case google.maps.DirectionsStatus.UNKNOWN_ERROR:
          break;
        case google.maps.DirectionsStatus.INVALID_REQUEST:
          break;
        case google.maps.DirectionsStatus.OVER_QUERY_LIMIT:
          break;
        case google.maps.DirectionsStatus.ZERO_RESULTS:
          console.log('response', response);
          break;
        case google.maps.DirectionsStatus.OK:
          // If we couldn't find a path, lets try with travelMode DRIVING
          // google.maps.TravelMode['DRIVING']
          console.log('route');
          console.log(response);

          // Render the direction
          _shelterComponent.directionsDisplay.setOptions({
            preserveViewport: preserveViewport
          });
          _shelterComponent.directionsDisplay.setDirections({routes: []});
          _shelterComponent.directionsDisplay.setDirections(response);
          break;
      }

    });

  };

  private resetSizeOfMarker(marker: any) {
    let icon = marker.icon;
    icon.scaledSize.width = 29;
    icon.scaledSize.height = 30;
    marker.setIcon(icon);
  }

  private setShelterMarkerEventData(shelter: Shelter, marker: any ) {
    var _shelterComponent = this;

    google.maps.event.addListener(marker, 'click', function(event: Event) {

      // If there's a selected shelter, reset the size of it
      if( typeof _shelterComponent.selectedShelterMarker !== 'undefined' ) {
        _shelterComponent.resetSizeOfMarker(_shelterComponent.selectedShelterMarker);
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
      _shelterComponent.findClosestPath(
        this.map.getCenter(),
        this.getPosition(),
        false,
        google.maps.TravelMode['WALKING']);
    });
  }
}