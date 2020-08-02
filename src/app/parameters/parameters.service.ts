import { Injectable } from '@angular/core';
import parametersJSON from './parameters.json';
import { Parameter } from './parameter.model';
import { Units } from 'src/app/units/units.model';
import { UnitsService } from 'src/app/units/units.service';

@Injectable({
  providedIn: 'root'
})
export class ParametersService {
  private parameters: Parameter[] = [];

  constructor(private unitsService: UnitsService) {
    // console.log('S--> PARAMETERS SERVICE INITIALIZED');
    for (const p of parametersJSON) {
      const type: string = p.type;
      const defaultUnits: Units = this.unitsService.getUnits(type)[0];
      const parameter: Parameter = {
        description: p.description,
        value: p.value,
        type: type,
        units: defaultUnits,
      }
      this.parameters.push(parameter);
    }
  }

  getParameters(): Parameter[] {
    return this.parameters;
  }
}
