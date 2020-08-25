import { Component, OnInit } from '@angular/core';
import { ParametersService } from 'src/app/parameters/parameters.service';
import { Parameter, Strategy } from 'src/app/parameters/parameter.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'my-app';
  public parameters: {[type: string]: Parameter};
  public resultParameter: Parameter;
  public strategies: typeof Strategy = Strategy;
  public calculationStrategy: Strategy;

  constructor(private parametersService: ParametersService) {}

  ngOnInit(): void {
    this.parameters = this.parametersService.getParameters();
    // console.log('C--> APP COMPONENT INIT', this.parameters);
  }

  // calculate() {
  //   const result = this.resultParameter.calculate(this.calculationStrategy);
  // }
}
