import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerModalPage } from './timer-modal.page';

describe('TimerModalPage', () => {
  let component: TimerModalPage;
  let fixture: ComponentFixture<TimerModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimerModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
