import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CronometrosPage } from './cronometros.page';

describe('CronometrosPage', () => {
  let component: CronometrosPage;
  let fixture: ComponentFixture<CronometrosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CronometrosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CronometrosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
