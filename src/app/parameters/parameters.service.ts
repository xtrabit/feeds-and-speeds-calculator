import { Injectable } from '@angular/core';
import parametersJSON from './parameters.json';
import { Parameter, ParameterData, createParameter } from './parameter.model';
import { Units } from 'src/app/units/units.model';
import { UnitsService } from 'src/app/units/units.service';

@Injectable({
  providedIn: 'root'
})
export class ParametersService {
  // private parameters: Parameter[];
  private parameters: {
    [type: string]: Parameter
  }

  constructor(private unitsService: UnitsService) {
    // console.log('S--> PARAMETERS SERVICE INITIALIZED');
    this.parameters = {};
    for (const p of parametersJSON) {
      const type: string = p.type;
      const defaultUnits: Units = this.unitsService.getUnits(type)[0];
      const parameter: ParameterData = {
        description: p.description,
        value: p.value,
        type: type,
        units: defaultUnits,
      }
      this.parameters[type] = createParameter(parameter);
    }
  }

  getParameters(): {[type: string]: Parameter} {
    return this.parameters;
  }
}
