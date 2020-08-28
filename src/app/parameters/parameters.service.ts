import { Injectable } from '@angular/core';
import { parametersData } from './parameters.data';
import { Parameter, Parameters, ParameterData, createParameter } from './parameter.model';
import { Units } from 'src/app/units/units.model';
import { UnitsService } from 'src/app/units/units.service';

@Injectable({
  providedIn: 'root'
})
export class ParametersService {
  // private parameters: Parameter[];
  private parameters: Parameters;

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
        digits: p.digits,
      }
      this.parameters[type] = createParameter(parameter, this.parameters);
    }
  }

  getParameters(): Parameters {
    return this.parameters;
  }
}
