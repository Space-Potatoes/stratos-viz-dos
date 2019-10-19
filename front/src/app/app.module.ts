import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AudienceSelectorComponent } from './components/audience-selector/audience-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    AudienceSelectorComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
