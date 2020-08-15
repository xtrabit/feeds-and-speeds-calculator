import { Injectable } from '@angular/core';
import { parametersData } from './parameters.data';
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
    for (const p of parametersData) {
      const type: string = p.type;
      const defaultUnits: Units = this.unitsService.getUnits(type)[0];
      const parameter: ParameterData = {
        description: p.description,
        strategy: p.strategy,
        type: type,
        units: defaultUnits,
        value: p.value,
      }
      this.parameters[type] = createParameter(parameter);
    }
  }

  getParameters(): {[type: string]: Parameter} {
    return this.parameters;
  }
}
