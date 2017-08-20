import { GmapsPosition } from './gmaps-position.model';
import { Hospital } from './hospital.model';
import { Shelter } from './shelter.model';
import Marker = google.maps.Marker;
import MarkerOptions = google.maps.MarkerOptions;

export interface GmapsMarkerOptions extends MarkerOptions {
  type: string;
  hospital?: Hospital;
  shelter?: Shelter;
}

export interface GmapsMarkerOptionsHospital extends GmapsMarkerOptions {
  hospital: Hospital;
}

export interface GmapsMarkerOptionsShelter extends GmapsMarkerOptions {
  shelter: Shelter;
}

export interface GmapsMarker extends Marker {
  type: string;
  hospital?: Hospital;
  shelter?: Shelter;
}

export interface GmapsMarkerHospital extends GmapsMarker {
  hospital: Hospital;
}

export interface GmapsMarkerShelter extends GmapsMarker {
  shelter: Shelter;
}
