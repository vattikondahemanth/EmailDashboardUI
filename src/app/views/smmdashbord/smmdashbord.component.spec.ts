import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SMMdashbordComponent } from './smmdashbord.component';

describe('SMMdashbordComponent', () => {
  let component: SMMdashbordComponent;
  let fixture: ComponentFixture<SMMdashbordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SMMdashbordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SMMdashbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
