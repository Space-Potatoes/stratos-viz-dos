import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudienceSelectorComponent } from './audience-selector.component';

describe('AudienceSelectorComponent', () => {
  let component: AudienceSelectorComponent;
  let fixture: ComponentFixture<AudienceSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudienceSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudienceSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
