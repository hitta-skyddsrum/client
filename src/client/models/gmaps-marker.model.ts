import { GmapsPosition } from './gmaps-position.model';
import { GmapsMarkerIcon } from './gmaps-marker-icon.model';

export interface GmapsMarker {
  type: string;
  position: GmapsPosition;
  icon: GmapsMarkerIcon;
  setIcon(icon: GmapsMarkerIcon): void;
}