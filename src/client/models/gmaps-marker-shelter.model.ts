import { GmapsMarker } from './gmaps-marker.model';
import { Shelter } from './shelter.model';

export interface GmapsMarkerShelter extends GmapsMarker {
  shelter: Shelter;
}