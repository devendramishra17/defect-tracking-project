import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QadevComponent } from './qadev.component';

describe('QadevComponent', () => {
  let component: QadevComponent;
  let fixture: ComponentFixture<QadevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QadevComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QadevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
