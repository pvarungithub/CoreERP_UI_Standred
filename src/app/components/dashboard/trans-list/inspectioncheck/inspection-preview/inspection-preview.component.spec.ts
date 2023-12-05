import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionPreviewComponent } from './inspection-preview.component';

describe('InspectionPreviewComponent', () => {
  let component: InspectionPreviewComponent;
  let fixture: ComponentFixture<InspectionPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InspectionPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InspectionPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
