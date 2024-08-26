import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationCardBordComponent } from './application-card-bord.component';

describe('ApplicationCardBordComponent', () => {
  let component: ApplicationCardBordComponent;
  let fixture: ComponentFixture<ApplicationCardBordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationCardBordComponent]
    });
    fixture = TestBed.createComponent(ApplicationCardBordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
