import { Position } from './position.model';

export interface Shelter {
  id: number;
  address: string;
  municipality: string;
  city: string;
  slots: number;
  air_cleaners: number;
  filterType: string;
  shelterId: string;
  estateId: string;
  goid: string;
  position: Position;
}
