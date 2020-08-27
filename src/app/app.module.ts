import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParameterComponent } from './parameters/parameter.component';
import { EnumToArrayPipe } from './shared/enumToArray.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ParameterComponent,
    EnumToArrayPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
