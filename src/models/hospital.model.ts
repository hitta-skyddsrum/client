import { Position } from './position.model';

export interface Hospital {
  position: Position;
  name: string;
  address: string;
  hsaId: string;
}
