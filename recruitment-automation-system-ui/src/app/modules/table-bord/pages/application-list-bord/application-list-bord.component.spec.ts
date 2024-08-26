import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationListBordComponent } from './application-list-bord.component';

describe('ApplicationListBordComponent', () => {
  let component: ApplicationListBordComponent;
  let fixture: ComponentFixture<ApplicationListBordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationListBordComponent]
    });
    fixture = TestBed.createComponent(ApplicationListBordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
