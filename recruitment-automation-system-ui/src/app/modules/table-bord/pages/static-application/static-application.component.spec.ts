import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticApplicationComponent } from './static-application.component';

describe('StaticApplicationComponent', () => {
  let component: StaticApplicationComponent;
  let fixture: ComponentFixture<StaticApplicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StaticApplicationComponent]
    });
    fixture = TestBed.createComponent(StaticApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
