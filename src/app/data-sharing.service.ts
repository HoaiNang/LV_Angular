import { Injectable } from '@angular/core';
import { extend } from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  coordinates: any;

  setCoordinates(coords: any) {
    this.coordinates = coords;
  }

  // getCoordinates(): string {
  //   return `${this.coordinates}`;
  // }
  getCoordinates(){
    return this.coordinates;
  }
}

