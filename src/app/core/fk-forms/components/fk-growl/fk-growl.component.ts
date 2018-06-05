import { Component, OnInit, Input, AfterViewInit, DoCheck, OnDestroy, EventEmitter,
         ViewChild, ElementRef, Optional, NgZone, IterableDiffers, Output } from '@angular/core';
import { Message } from 'primeng/components/common/message';
import { DomHandler } from 'primeng/components/dom/domhandler';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-fk-growl',
  templateUrl: './fk-growl.component.html',
  styleUrls: ['./fk-growl.component.scss']
})
export class FkGrowlComponent implements AfterViewInit, DoCheck, OnDestroy {

  @Input() life = 3000;

  @Input() style: any;

  @Input() styleClass: string;

  @Input() immutable = true;

  @Input() autoZIndex = true;

  @Input() baseZIndex = 0;

  @Input() key: string;

  @Output() click: EventEmitter<any> = new EventEmitter();

  @Output() hover: EventEmitter<any> = new EventEmitter();

  @Output() close: EventEmitter<any> = new EventEmitter();

  @Output() valueChange: EventEmitter<Message[]> = new EventEmitter<Message[]>();

  @ViewChild('container') containerViewChild: ElementRef;

  _sticky: boolean;

  _value: Message[];

  timeout: any;

  preventRerender: boolean;

  differ: any;

  subscription: Subscription;

  closeIconClick: boolean;

  constructor(public el: ElementRef, public domHandler: DomHandler, public differs: IterableDiffers,
    @Optional() public messageService: MessageService, private zone: NgZone) {
    this.differ = differs.find([]).create(null);

    if (messageService) {
      this.subscription = messageService.messageObserver.subscribe(messages => {
        if (messages) {
          if (messages instanceof Array) {
            const filteredMessages = messages.filter(m => this.key === m.key);
            this.value = this.value ? [...this.value, ...filteredMessages] : [...filteredMessages];
          } else if (this.key === messages.key) {
            this.value = this.value ? [...this.value, ...[messages]] : [messages];
          }
        } else {
          this.value = null;
        }
      });
    }
  }

  ngAfterViewInit() {
    if (!this.sticky) {
      this.initTimeout();
    }
  }

  @Input() get value(): Message[] {
    return this._value;
  }

  set value(val: Message[]) {
    this._value = val;
    if (this.containerViewChild && this.containerViewChild.nativeElement && this.immutable) {
      this.handleValueChange();
    }
  }

  @Input() get sticky(): boolean {
    return this._sticky;
  }

  set sticky(value: boolean) {
    if (value && this.timeout) {
      clearTimeout(this.timeout);
    }
    this._sticky = value;
  }

  ngDoCheck() {
    if (!this.immutable && this.containerViewChild && this.containerViewChild.nativeElement) {
      const changes = this.differ.diff(this.value);
      if (changes) {
        this.handleValueChange();
      }
    }
  }

  handleValueChange() {
    if (this.preventRerender) {
      this.preventRerender = false;
      return;
    }

    if (this.autoZIndex) {
      this.containerViewChild.nativeElement.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
    }
    this.domHandler.fadeIn(this.containerViewChild.nativeElement, 250);

    if (!this.sticky) {
      this.initTimeout();
    }
  }

  initTimeout() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.zone.runOutsideAngular(() => {
      this.timeout = setTimeout(() => {
        this.zone.run(() => {
          this.removeAll();
        });
      }, this.life);
    });
  }

  remove(index: number, msgel: any) {
    this.closeIconClick = true;
    this.domHandler.fadeOut(msgel, 250);

    setTimeout(() => {
      this.preventRerender = true;
      this.close.emit({ message: this.value[index] });

      if (this.immutable) {
        this._value = this.value.filter((val, i) => i !== index);
        this.valueChange.emit(this._value);
      } else {
        this._value.splice(index, 1);
      }
    }, 250);
  }

  removeAll() {
    if (this.value && this.value.length) {
      this.domHandler.fadeOut(this.containerViewChild.nativeElement, 250);

      setTimeout(() => {
        this.value.forEach((msg, index) => this.close.emit({ message: this.value[index] }));
        if (this.immutable) {
          this.value = [];
          this.valueChange.emit(this.value);
        } else {
          this.value.splice(0, this.value.length);
        }
      }, 250);
    }
  }

  onMessageClick(i: number) {
    if (this.closeIconClick) {
      this.closeIconClick = false;
    } else {
      this.click.emit({ message: this.value[i] });
    }
  }

  onMessageHover(i: number) {
    this.hover.emit({ message: this.value[i] });
  }

  ngOnDestroy() {
    if (!this.sticky) {
      clearTimeout(this.timeout);
    }

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
