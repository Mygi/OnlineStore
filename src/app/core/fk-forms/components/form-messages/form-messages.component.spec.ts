import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMessagesComponent } from './form-messages.component';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from '../../services/message.service';
import { GrowlModule } from 'primeng/growl';

describe('FormMessagesComponent', () => {
  let component: FormMessagesComponent;
  let fixture: ComponentFixture<FormMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MessagesModule,
      GrowlModule],
      declarations: [ FormMessagesComponent ],
      providers: [MessageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
