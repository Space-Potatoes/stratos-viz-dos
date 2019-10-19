import { Component, ViewChild, OnInit } from '@angular/core';
import { AudienceSelectorComponent } from './components/audience-selector/audience-selector.component';
import { Audience } from 'src/types/audience';

@Component({
	selector: 'app-root',
	template: `

		<!-- The Audience Selector -->
		<app-audience-selector></app-audience-selector>

	`,
	styles: []
})
export class AppComponent implements OnInit {

	// Children
	@ViewChild(AudienceSelectorComponent, undefined) audienceSelector : AudienceSelectorComponent;

	// Variables
	title = 'stratos-viz-das';

	// Methods
	onAudienceSelector(audience : Audience) {
		this.audienceSelector.shrink();
	}

	// Lifecycle
	ngOnInit() {
		this.audienceSelector.OnAudienceSelected((a) => this.onAudienceSelector(a));
	}
}
