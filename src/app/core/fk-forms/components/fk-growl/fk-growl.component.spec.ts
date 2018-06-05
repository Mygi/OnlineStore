import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FkGrowlComponent } from './fk-growl.component';

describe('FkGrowlComponent', () => {
  let component: FkGrowlComponent;
  let fixture: ComponentFixture<FkGrowlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FkGrowlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FkGrowlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
