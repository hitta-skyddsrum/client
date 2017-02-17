import { GmapsMarker } from './gmaps-marker.model';
import { Hospital } from './hospital.model';

export interface GmapsMarkerHospital extends GmapsMarker {
  hospital: Hospital;
}