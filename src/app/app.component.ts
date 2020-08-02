import { Component, OnInit } from '@angular/core';
import { ParametersService } from 'src/app/parameters/parameters.service';
import { Parameter } from 'src/app/parameters/parameter.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'my-app';
  public parameters: Parameter[];

  constructor(private parametersService: ParametersService) {}

  ngOnInit(): void {
    // console.log('C--> APP COMPONENT INIT', this.parameters);
    this.parameters = this.parametersService.getParameters();
  }
}
