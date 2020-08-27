import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, OnChanges, SimpleChanges, ChangeDetectorRef, AfterViewInit, ApplicationRef, ViewChildren, QueryList } from '@angular/core';
import { Parameter, Strategy } from './parameter.model';
import { Units } from 'src/app/units/units.model';
import { UnitsService } from 'src/app/units/units.service';
import { ParametersService } from './parameters.service';

@Component({
  selector: 'app-parameter',
  templateUrl: './parameter.component.html',
  styleUrls: ['./parameter.component.scss']
})
export class ParameterComponent implements OnInit, OnChanges {
  public units: Units[];

  @Input() parameter: Parameter;
  @Input() resultParameter: Parameter;
  @Input() calculationStrategy: Strategy;
  @Output() resultParameterChange = new EventEmitter<Parameter>();
  @ViewChild('myRef') myRef: ElementRef;

  get value() {
    if (this.myRef) {
      const val = this.myRef.nativeElement.value;
      if (parseFloat(val) === this.parameter.value) {
        return val;
      }
    }
    return this.parameter.value.toString();
  }

  set value(value: string) {
    const val = this.parameter.validate(value);
    this.myRef.nativeElement.value = val;
    this.calculate();
  }

  calculate(parameter: Parameter = this.resultParameter) {
    if (parameter && this.calculationStrategy) {
      parameter.calculate(this.calculationStrategy);
    }
  }

  constructor(public parametersService: ParametersService, public unitsService: UnitsService) { }

  ngOnChanges(changes: SimpleChanges) {
    // this.calculate();
    // if (changes.resultParameter && changes.resultParameter.currentValue === this.parameter && this.calculationStrategy) {
    //   this.parameter.calculate(this.calculationStrategy);
    //   console.log(changes.resultParameter.currentValue);
    // }
  }

  log(value) {
    console.log('LOGGING', value);
  }

  ngOnInit(): void {
    this.units = this.unitsService.getUnits(this.parameter.type);
  }

  onResultParameterChange() {
    this.calculate(this.parameter);
    this.resultParameterChange.emit(this.parameter);
  }
}
