import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileuploadPreviewComponent } from './fileupload-preview.component';

describe('FileuploadPreviewComponent', () => {
  let component: FileuploadPreviewComponent;
  let fixture: ComponentFixture<FileuploadPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileuploadPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileuploadPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
