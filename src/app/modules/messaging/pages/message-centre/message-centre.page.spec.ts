import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageCentreComponent } from './message-centre.page';

describe('MessageCentreComponent', () => {
  let component: MessageCentreComponent;
  let fixture: ComponentFixture<MessageCentreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageCentreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageCentreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
