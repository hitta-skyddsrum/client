import { ApiService } from '../../shared/api/api.service';
import { AfterViewInit, Component } from '@angular/core';
import { SheltersUserStateService } from '../user-state/shelters.user-state.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Shelter } from '../../../models/shelter.model';
import { Hospital } from '../../../models/hospital.model';
import { Position } from '../../../models/position.model';
import {
  GmapsMarker,
  GmapsMarkerHospital,
  GmapsMarkerOptionsHospital, GmapsMarkerOptionsShelter,
  GmapsMarkerShelter
} from '../../../models/gmaps-marker.model';
import { Observable } from 'rxjs';
import Icon = google.maps.Icon;

declare var MarkerClusterer: any;

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  templateUrl: 'shelters.map.component.html',
  styleUrls: ['shelters.map.component.scss'],
  selector: 'hs-map',
})

export class SheltersMapComponent implements AfterViewInit {
  public whenSheltersIsPlotted$: Observable <boolean>;
  public whenHospitalsIsPlotted$: Observable <boolean>;

  private map: any;
  private directionsDisplay: any;
  private selectedShelterMarker: GmapsMarkerShelter = null;
  private selectedHospitalMarker: GmapsMarkerHospital = null;
  private shelterMarkers: GmapsMarkerShelter[] = [];
  private hospitalMarkers: GmapsMarkerHospital[] = [];
  private markerClusterer: any;

  private sheltersIsPlotted: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private hospitalsIsPlotted: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private sheltersUserStateService: SheltersUserStateService,
    apiService: ApiService) {
    this.whenSheltersIsPlotted$ = this.sheltersIsPlotted.asObservable().filter((r) => r === true);
    this.whenHospitalsIsPlotted$ = this.hospitalsIsPlotted.asObservable().filter((r) => r === true);
  }

  public ngAfterViewInit() {
    this.loadMap();
    this.sheltersUserStateService.shelters$.subscribe(
      (shelters: Shelter[]) => this.plotShelters(shelters)
    );

    this.sheltersUserStateService.hospitals$.subscribe(
      (hospitals: Hospital[]) => this.plotHospitals(hospitals)
    );

    this.sheltersUserStateService.currentPosition$.subscribe(
      (position: Position) => this.plotCurrentPosition(position)
    );

    this.sheltersUserStateService.selectedShelter$.subscribe(
      (shelter: Shelter) => this.selectShelter(shelter)
    );

    this.sheltersUserStateService.selectedHospital$.subscribe(
      (hospital: Hospital) => this.selectHospital(hospital)
    );
  }

  private selectHospital(hospital: Hospital) {
    let _subsc = this.whenSheltersIsPlotted$
      .take(1)
      .subscribe(
      () => this.clickMarker(
        this.hospitalMarkers.find(marker => marker.hospital.hsaId === hospital.hsaId)
      ));
  }

  private selectShelter(shelter: Shelter) {
    this.whenSheltersIsPlotted$
      .take(1)
      .subscribe(
      () => {
        for (let marker of this.shelterMarkers) {
          if (marker.shelter.id === shelter.id) {
            this.clickMarker(marker);
            break;
          }
        }
      });
  }

  private clickMarker(marker: GmapsMarker) {
    google.maps.event.trigger(marker, 'click');
  }

  private loadMap() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 5,
      center: {lat: 60.490, lng: 14.941},
      mapTypeControl: false
    });

    this.directionsDisplay = new google.maps.DirectionsRenderer();
    this.directionsDisplay.setMap(this.map);
    this.directionsDisplay.setOptions({
      suppressMarkers: true
    });

    this.sheltersUserStateService.setMapAsLoaded();
  }

  private findClosestPath(
    origin: Position,
    destination: Position,
    preserveViewport: boolean,
    travelMode: any
  ) {
    let directionsService = new google.maps.DirectionsService();
    let _shelterComponent = this;

    // If travelMode isnt set, lets set it to WALKING
    if (typeof travelMode === 'undefined') {
      travelMode = google.maps.TravelMode['WALKING'];
    }

    // Prepare request to get the route for the closest route
    let request = {
      origin: new google.maps.LatLng(origin.lat, origin.long),
      destination: new google.maps.LatLng(destination.lat, destination.long),
      travelMode,
      optimizeWaypoints: true
    };

    // Request the route
    directionsService.route(request, (response: any, status: any) => {
      /**
       * TODO: Display alert on error
       */
      switch (status) {
        case google.maps.DirectionsStatus.OK:
          // If we couldn't find a path, lets try with travelMode DRIVING
          // google.maps.TravelMode['DRIVING']

          // Render the direction
          _shelterComponent.directionsDisplay.setOptions({
            preserveViewport
          });
          _shelterComponent.directionsDisplay.setDirections({routes: []});
          _shelterComponent.directionsDisplay.setDirections(response);
          break;
        case google.maps.DirectionsStatus.REQUEST_DENIED:
        case google.maps.DirectionsStatus.UNKNOWN_ERROR:
        case google.maps.DirectionsStatus.INVALID_REQUEST:
        case google.maps.DirectionsStatus.OVER_QUERY_LIMIT:
        case google.maps.DirectionsStatus.ZERO_RESULTS:
        default:
          break;
      }

    });

  };

  private plotCurrentPosition(position: Position) {
    new google.maps.Marker(<any>{
      position: new google.maps.LatLng(position.lat, position.long),
      map: this.map,
      type: 'currentPosition',
    });
  }

  private plotShelters(shelters: Shelter[]) {
    this.sheltersIsPlotted.next(false);

    // Collect the shelters that already is marked
    let seenShelters: number[] = [];
    for (let marker of this.shelterMarkers) {
      seenShelters.push(marker.shelter.id);
    }

    // Create all the markers
    for (let shelter of shelters) {
      if (seenShelters.indexOf(shelter.id) !== -1) {
        continue;
      }

      let marker = <GmapsMarkerShelter> new google.maps.Marker(<GmapsMarkerOptionsShelter> {
        position: new google.maps.LatLng(shelter.position.lat, shelter.position.long),
        map: this.map,
        icon: {
          url: '/assets/images/icon-shelter.png',
          scaledSize: new google.maps.Size(30, 30)
        },
        shelter,
        type: 'shelter'
      });

      this.setShelterMarkerEventData(shelter, marker);
      this.shelterMarkers.push(marker);
    }

    this.markerClusterer = new MarkerClusterer(this.map, this.shelterMarkers, {
      enableRetinaIcons: false,
      maxZoom: 15,
      imagePath: '/assets/images/icon-shelter-cluster',
      imageExtension: 'png'
    });

    google.maps.event.addListener(
      this.markerClusterer,
      'clusteringbegin',
      (markerClusterer: any) => {
//      console.log('nu börjar vi!', markerClusterer);
    });

    google.maps.event.addListener(
      this.markerClusterer,
      'clusteringend',
      (markerClusterer: any) => {
//      console.log('nu slutar vi!', markerClusterer);
    });

    this.sheltersIsPlotted.next(true);
  }

  private plotHospitals(hospitals: Hospital[]) {
    this.hospitalsIsPlotted.next(false);

    // Collect the hospitals that already is marked
    let seenHospitals: any[] = [];
    for (let marker of this.hospitalMarkers) {
      seenHospitals.push(marker.hospital.hsaId);
    }

    for (let hospital of hospitals) {
      if (seenHospitals.indexOf(hospital.hsaId) !== -1) {
        continue;
      }

      let marker = <GmapsMarkerHospital> new google.maps.Marker(<GmapsMarkerOptionsHospital> {
        position: new google.maps.LatLng(hospital.position.lat, hospital.position.long),
        map: this.map,
        icon: {
          url: '/assets/images/icon-hospital.png',
          scaledSize: new google.maps.Size(31, 31)
        },
        hospital,
        type: 'hospital',
      });

      this.setHospitalMarkerEventData(hospital, marker);
      this.hospitalMarkers.push(marker);
    }

    this.hospitalsIsPlotted.next(true);
  }

  private setSizeOfMarkerAsOriginal(marker: GmapsMarker, type: string) {
    let icon = <Icon> marker.getIcon();
    switch (type) {
      case 'shelter':
        icon.scaledSize.width = 29;
        icon.scaledSize.height = 30;
        break;
      case 'hospital':
        icon.scaledSize.width = 31;
        icon.scaledSize.height = 31;
        break;
      default:
        break;
    }
    marker.setIcon(icon);
  }

  private setSizeOfMarkerAsSelected(marker: GmapsMarker, type: string) {
    let icon = <Icon> marker.getIcon();
    switch (type) {
      case 'shelter':
        icon.scaledSize.width = 58;
        icon.scaledSize.height = 60;
        break;
      case 'hospital':
        icon.scaledSize.width = 62;
        icon.scaledSize.height = 62;
        break;
      default:
        break;
    }
    marker.setIcon(icon);
  }

  private setShelterMarkerEventData(shelter: Shelter, marker: GmapsMarkerShelter) {
    google.maps.event.addListener(marker, 'click', (event: Event) => {

        // If there's a selected shelter, reset the size of it
        if (this.selectedShelterMarker !== null) {
          this.setSizeOfMarkerAsOriginal(this.selectedShelterMarker, 'shelter');
        }

        // Set the new selected shelter
//        this.sheltersUserStateService.selectShelter(shelter);
        this.selectedShelterMarker = marker;

        this.setSizeOfMarkerAsSelected(this.selectedShelterMarker, 'shelter');

        this.sheltersUserStateService.currentPosition$.take(1).subscribe(
          (position: Position) => {
            // Write path
            this.findClosestPath(
              position,
              marker.shelter.position,
              false,
              google.maps.TravelMode['WALKING']
            );
          });
      }
    );

  }

  private setHospitalMarkerEventData(hospital: Hospital, marker: GmapsMarkerHospital) {
    google.maps.event.addListener(marker, 'click', (event: Event) => {
      // If there's a selected shelter, reset the size of it
      if (this.selectedHospitalMarker !== null) {
        this.setSizeOfMarkerAsOriginal(this.selectedHospitalMarker, 'hospital');
      }

      // Set the new selected shelter
      this.selectedHospitalMarker = marker;

      this.setSizeOfMarkerAsSelected(marker, 'hospital');

      // Write path
      this.findClosestPath(
        this.selectedShelterMarker.shelter.position,
        this.selectedHospitalMarker.hospital.position,
        false,
        google.maps.TravelMode['WALKING']
      );
    });
  }
}
