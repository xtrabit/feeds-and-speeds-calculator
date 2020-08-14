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

  @Input() parameter: Parameter;
  @Input() resultParameter: string;
  @Output() resultParameterChange = new EventEmitter<string>();

  constructor(public parametersService: ParametersService, public unitsService: UnitsService) { }

  log(value) {
    console.log('LOGGING', value)
  }

  ngOnInit(): void {
    // console.log('C--> PARAMETER COMPONENT INIT', this.parameter);
    this.units = this.unitsService.getUnits(this.parameter.type);
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   console.log('CHANGES', changes)
  // }

  onResultParameterChange() {
    this.resultParameterChange.emit(this.parameter.type);
  }
}
