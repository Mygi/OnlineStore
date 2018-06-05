import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEmailFormComponent } from './update-email-form.component';
import { MocksModule } from '../../../../mocks/mocks.module';
import { UserService } from '../../services/user.service';
import { MessageService } from '../../../../core/fk-forms/services/message.service';

describe('UpdateEmailFormComponent', () => {
  let component: UpdateEmailFormComponent;
  let fixture: ComponentFixture<UpdateEmailFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MocksModule],
      declarations: [ UpdateEmailFormComponent ],
      providers: [UserService, MessageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEmailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
