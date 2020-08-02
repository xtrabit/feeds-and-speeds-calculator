import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Parameter } from './parameter.model';
import { Units } from 'src/app/units/units.model';
import { UnitsService } from 'src/app/units/units.service';
import { ParametersService } from './parameters.service';

@Component({
  selector: 'app-parameter',
  templateUrl: './parameter.component.html',
  styleUrls: ['./parameter.component.scss']
})
export class ParameterComponent {
  public units: Units[];

  constructor(public parametersService: ParametersService, public unitsService: UnitsService) { }

  ngOnInit(): void {
    // console.log('C--> PARAMETER COMPONENT INIT', this.parameter);
    this.units = this.unitsService.getUnits(this.parameter.type);
  }

  log(value) {
    console.log('LOGGING', value)
  }

  @Input() parameter: Parameter;
  // @Output() parameterChange = new EventEmitter<Parameter>();

  // onParameterChange() {
  //   console.log('EMITTER ParameterComponent ParameterService', this.parametersService.getParameters())
  //   this.parameterChange.emit(this.parameter);
  // }

  // ngOnChanges(changes: SimpleChanges) {
  //   console.log('CHANGES', changes)
  // }
}
