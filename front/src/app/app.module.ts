import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

// Components
import { AppComponent } from './app.component';
import { AudienceSelectorComponent } from '../components/audience-selector/audience-selector.component';
import { GridContainerComponent } from '../components/grid-container/grid-container.component';
import { MapComponent } from '../components/map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    AudienceSelectorComponent,
    GridContainerComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
