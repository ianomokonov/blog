import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaketsComponent } from './makets.component';

describe('MaketsComponent', () => {
  let component: MaketsComponent;
  let fixture: ComponentFixture<MaketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
