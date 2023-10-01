import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoselectComponent } from './autoselect.component';

describe('AutoselectComponent', () => {
  let component: AutoselectComponent;
  let fixture: ComponentFixture<AutoselectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutoselectComponent]
    });
    fixture = TestBed.createComponent(AutoselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
