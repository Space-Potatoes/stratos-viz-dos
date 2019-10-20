import { Component, ViewChild, OnInit } from '@angular/core';

// Types
import { Audience } from 'src/types/audience';

// Components
import { AudienceSelectorComponent } from '../components/audience-selector/audience-selector.component';
import { GridContainerComponent } from 'src/components/grid-container/grid-container.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {

	// Children
	@ViewChild(AudienceSelectorComponent, undefined) audienceSelector : AudienceSelectorComponent;
	@ViewChild(GridContainerComponent, undefined) gridContainer : GridContainerComponent;

	// Variables
	title = 'stratos-vizdas';

	// Methods
	onAudienceSelector(audience : Audience) {
		this.gridContainer.onAudienceChange(audience);
	}

	// Lifecycle
	ngOnInit() {
		this.audienceSelector.OnAudienceSelected((a) => this.onAudienceSelector(a));
	}
}
