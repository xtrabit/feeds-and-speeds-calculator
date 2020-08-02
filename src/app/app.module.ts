import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParameterComponent } from './parameters/parameter.component';
// import { UnitsService } from 'src/app/units/units.service';
// import { ParametersService } from 'src/app/parameters.service';

@NgModule({
  declarations: [
    AppComponent,
    ParameterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [
    // UnitsService,
    // ParametersService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
