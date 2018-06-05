import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FkDialogComponent } from './fk-dialog.component';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('FkDialogComponent', () => {
  let fixture: ComponentFixture<FkDialogComponent>;
  let dialog: FkDialogComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FkDialogComponent ],
      imports: [NoopAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FkDialogComponent);
    dialog = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(dialog).toBeTruthy();
  });
  it('should display the header', () => {
    dialog.header = 'PrimeNG Dialog Header';
    fixture.detectChanges();
    const headerEl = fixture.debugElement.query(By.css('.ui-dialog-title'));
    expect(headerEl.nativeElement.textContent).toContain('PrimeNG Dialog Header');
  });

  it('should display close icon when closable', () => {
    fixture.detectChanges();
    const closeEl = fixture.debugElement.query(By.css('.ui-dialog-titlebar-close'));
    expect(closeEl).not.toBeNull();
  });

  it('should display resizer when resizable', () => {
    fixture.detectChanges();
    const resizeEl = fixture.debugElement.query(By.css('.ui-resizable-handle'));
    expect(resizeEl).not.toBeNull();
  });

  it('should be hidden by default', () => {
    fixture.detectChanges();
    expect(fixture.debugElement.children[0].styles.display).toEqual('none');
  });

  it('should add rtl class when rtl is enabled', () => {
    dialog.rtl = true;
    fixture.detectChanges();
    expect(fixture.debugElement.children[0].classes['ui-dialog-rtl']).toEqual(true);
  });

  it('should add draggable class when dragging is enabled', () => {
    fixture.detectChanges();
    expect(fixture.debugElement.children[0].classes['ui-dialog-draggable']).toEqual(true);
  });

  it('should show the dialog when visible is true', () => {
    spyOn(dialog, 'show');
    dialog.visible = true;
    fixture.detectChanges();
    expect(fixture.debugElement.children[0].styles.display).toEqual('block');
    expect(dialog.show).toHaveBeenCalled();
  });

  it('should call hide if visible is true and dialog gets hidden', () => {
    dialog.visible = true;
    fixture.detectChanges();

    spyOn(dialog, 'hide');
    dialog.visible = false;
    fixture.detectChanges();

    expect(fixture.debugElement.children[0].styles.display).toEqual('none');
    expect(dialog.hide).toHaveBeenCalled();
  });

  it('should update visible as false binding when close icon is clicked', () => {
    let show = true;
    dialog.visible = show;
    fixture.detectChanges();
    dialog.visibleChange.subscribe(value => show = value);

    const closeEl = fixture.nativeElement.querySelector('.ui-dialog-titlebar-close');
    closeEl.click();

    expect(show).toEqual(false);
  });
});
