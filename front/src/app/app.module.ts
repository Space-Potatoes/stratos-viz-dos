import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

// Components
import { AudienceSelectorComponent } from '../components/audience-selector/audience-selector.component';
import { GridContainerComponent } from '../components/grid-container/grid-container.component';
import { TemperatureComponent } from '../components/temperature/temperature.component';
import { AltitudeComponent } from '../components/altitude/altitude.component';
import { MapComponent } from '../components/map/map.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AudienceSelectorComponent,
    GridContainerComponent,
    TemperatureComponent,
    AltitudeComponent,
    AppComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
