import { Injectable } from '@angular/core';
import unitsJSON from './units.json';
import { Units } from './units.model';

@Injectable({
  providedIn: 'root'
})
export class UnitsService {
  private units: {
    [type: string]: Units[];
  } = {};

  constructor() {
    // console.log('S--> UNITS SERVICE INITIALIZED');
    for (let type in unitsJSON) {
      this.units[type] = unitsJSON[type];
    }
  }

  getUnits(type) {
    return this.units[type];
  }
}
