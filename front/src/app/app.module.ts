import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GridContainerComponent } from '../components/grid-container/grid-container.component';
import { AudienceSelectorComponent } from './components/audience-selector/audience-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    AudienceSelectorComponent,
    GridContainerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
