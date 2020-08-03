import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentoftaxaccountstotaxcodesComponent } from './assignmentoftaxaccountstotaxcodes.component';

describe('AssignmentoftaxaccountstotaxcodesComponent', () => {
  let component: AssignmentoftaxaccountstotaxcodesComponent;
  let fixture: ComponentFixture<AssignmentoftaxaccountstotaxcodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentoftaxaccountstotaxcodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentoftaxaccountstotaxcodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
