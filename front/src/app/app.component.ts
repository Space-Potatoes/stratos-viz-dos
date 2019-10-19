import { Component, ViewChild, OnInit } from '@angular/core';
import { AudienceSelectorComponent } from './components/audience-selector/audience-selector.component';
import { Audience } from 'src/types/audience';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {

	// Children
	@ViewChild(AudienceSelectorComponent, undefined) audienceSelector : AudienceSelectorComponent;

	// Variables
	title = 'stratos-viz-das';

	// Methods
	onAudienceSelector(audience : Audience) {
		
		// Do something with the new audience

	}

	// Lifecycle
	ngOnInit() {
		this.audienceSelector.OnAudienceSelected((a) => this.onAudienceSelector(a));
	}
}
