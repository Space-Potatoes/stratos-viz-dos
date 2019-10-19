import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GridContainerComponent } from '../components/grid-container/grid-container.component';
import { MapComponent } from '../components/map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    GridContainerComponent,
    MapComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
