import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifListComponent } from './notif-list.component';

describe('NotifListComponent', () => {
  let component: NotifListComponent;
  let fixture: ComponentFixture<NotifListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotifListComponent]
    });
    fixture = TestBed.createComponent(NotifListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
