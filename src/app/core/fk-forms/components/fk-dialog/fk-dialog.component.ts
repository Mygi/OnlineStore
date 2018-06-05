import { Component, OnInit, ElementRef, Renderer2, NgZone, Input, AfterViewInit, AfterViewChecked, OnDestroy,
         ContentChildren, QueryList, ViewChild, Output, EventEmitter } from '@angular/core';
import { DomHandler } from 'primeng/components/dom/domhandler';
import { animate, transition, state, style, trigger } from '@angular/animations';
import { Header, Footer } from 'primeng/components/common/shared';

let idx = 0;
@Component({
  selector: 'app-fk-dialog',
  templateUrl: './fk-dialog.component.html',
  animations: [
    trigger('dialogState', [
      state('hidden', style({
        opacity: 0
      })),
      state('visible', style({
        opacity: 1
      })),
      transition('visible => hidden', animate('400ms ease-in')),
      transition('hidden => visible', animate('400ms ease-out'))
    ])
  ],
  styleUrls: ['./fk-dialog.component.scss']
})
export class FkDialogComponent implements AfterViewInit, AfterViewChecked, OnDestroy {

  @Input() header: string;

  @Input() draggable = true;

  @Input() resizable = true;

  @Input() minWidth = 150;

  @Input() minHeight = 150;

  @Input() width: any;

  @Input() height: any;

  @Input() positionLeft: number;

  @Input() positionTop: number;

  @Input() contentStyle: any;

  @Input() modal: boolean;

  @Input() closeOnEscape = true;

  @Input() dismissableMask: boolean;

  @Input() rtl: boolean;

  @Input() closable = true;

  @Input() responsive = true;

  @Input() appendTo: any;

  @Input() style: any;

  @Input() styleClass: string;

  @Input() showHeader = true;

  @Input() breakpoint = 640;

  @Input() blockScroll = false;

  @Input() autoZIndex = true;

  @Input() baseZIndex = 0;

  @Input() minX = 0;

  @Input() minY = 0;

  @Input() autoAlign = true;

  @Input() focusOnShow = true;

  @ContentChildren(Header, { descendants: false }) headerFacet: QueryList<Header>;

  @ContentChildren(Footer, { descendants: false }) footerFacet: QueryList<Header>;

  @ViewChild('container') containerViewChild: ElementRef;

  @ViewChild('titlebar') headerViewChild: ElementRef;

  @ViewChild('content') contentViewChild: ElementRef;

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onShow: EventEmitter<any> = new EventEmitter();

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onHide: EventEmitter<any> = new EventEmitter();

  @Output() visibleChange: EventEmitter<any> = new EventEmitter();

  _visible: boolean;

  dragging: boolean;

  documentDragListener: any;

  documentDragEndListener: any;

  resizing: boolean;

  documentResizeListener: any;

  documentResizeEndListener: any;

  documentResponsiveListener: any;

  documentEscapeListener: Function;

  maskClickListener: Function;

  lastPageX: number;

  lastPageY: number;

  mask: HTMLDivElement;

  closeIconMouseDown: boolean;

  preWidth: number;

  preventVisibleChangePropagation: boolean;

  executePostDisplayActions: boolean;

  initialized: boolean;

  currentHeight: number;

  id = `ui-dialog-${idx++}`;

  constructor(public el: ElementRef, public domHandler: DomHandler, public renderer: Renderer2, public zone: NgZone) { }

  @Input() get visible(): boolean {
    return this._visible;
  }

  set visible(val: boolean) {
    this._visible = val;

    if (this.initialized && this.containerViewChild && this.containerViewChild.nativeElement) {
      if (this._visible) {
        this.show();
      } else {
        if (this.preventVisibleChangePropagation) {
          this.preventVisibleChangePropagation = false;
        } else {
          this.hide();
        }
      }
    }
  }

  ngAfterViewChecked() {
    if (this.executePostDisplayActions) {
      this.onShow.emit({});
      this.positionOverlay();
      if (this.focusOnShow) {
        this.focus();
      }
      this.currentHeight = this.domHandler.getOuterHeight(this.containerViewChild.nativeElement);
      this.executePostDisplayActions = false;
    } else if (this.autoAlign && this.visible) {
      this.zone.runOutsideAngular(() => {
        setTimeout(() => {
          const height = this.domHandler.getOuterHeight(this.containerViewChild.nativeElement);

          if (height !== this.currentHeight) {
            this.currentHeight = height;
            this.positionOverlay();
          }
        }, 50);
      });
    }
  }

  focus() {
    const focusable = this.domHandler.findSingle(this.containerViewChild.nativeElement, 'button');
    if (focusable) {
      focusable.focus();
    }
  }

  show() {
    this.executePostDisplayActions = true;
    this.moveOnTop();
    this.bindGlobalListeners();

    if (this.modal) {
      this.enableModality();
    }
  }

  positionOverlay() {
    const viewport = this.domHandler.getViewport();
    if (this.domHandler.getOuterHeight(this.containerViewChild.nativeElement) > viewport.height) {
      this.contentViewChild.nativeElement.style.height = (viewport.height * .75) + 'px';
    }

    if (this.positionLeft >= 0 && this.positionTop >= 0) {
      this.containerViewChild.nativeElement.style.left = this.positionLeft + 'px';
      this.containerViewChild.nativeElement.style.top = this.positionTop + 'px';
    } else if (this.positionTop >= 0) {
      this.center();
      this.containerViewChild.nativeElement.style.top = this.positionTop + 'px';
    } else {
      this.center();
    }
  }

  hide() {
    this.onHide.emit({});
    this.unbindMaskClickListener();
    this.unbindGlobalListeners();
    this.dragging = false;

    if (this.modal) {
      this.disableModality();
    }
  }

  close(event: Event) {
    this.preventVisibleChangePropagation = true;
    this.hide();
    this.visibleChange.emit(false);
    event.preventDefault();
  }

  ngAfterViewInit() {
    this.initialized = true;

    if (this.appendTo) {
      if (this.appendTo === 'body') {
        document.body.appendChild(this.containerViewChild.nativeElement);
      } else {
        this.domHandler.appendChild(this.containerViewChild.nativeElement, this.appendTo);
      }
    }

    if (this.visible) {
      this.show();
    }
  }

  center() {
    let elementWidth = this.domHandler.getOuterWidth(this.containerViewChild.nativeElement);
    let elementHeight = this.domHandler.getOuterHeight(this.containerViewChild.nativeElement);
    if (elementWidth === 0 && elementHeight === 0) {
      this.containerViewChild.nativeElement.style.visibility = 'hidden';
      this.containerViewChild.nativeElement.style.display = 'block';
      elementWidth = this.domHandler.getOuterWidth(this.containerViewChild.nativeElement);
      elementHeight = this.domHandler.getOuterHeight(this.containerViewChild.nativeElement);
      this.containerViewChild.nativeElement.style.display = 'none';
      this.containerViewChild.nativeElement.style.visibility = 'visible';
    }
    const viewport = this.domHandler.getViewport();
    const x = Math.max((viewport.width - elementWidth) / 2, 0);
    const y = Math.max((viewport.height - elementHeight) / 2, 0);

    this.containerViewChild.nativeElement.style.left = x + 'px';
    this.containerViewChild.nativeElement.style.top = y + 'px';
  }

  enableModality() {
    if (!this.mask) {
      this.mask = document.createElement('div');
      this.mask.style.zIndex = String(parseInt(this.containerViewChild.nativeElement.style.zIndex, 10) - 1);
      let maskStyleClass = 'ui-widget-overlay ui-dialog-mask';
      if (this.blockScroll) {
        maskStyleClass += ' ui-dialog-mask-scrollblocker';
      }
      this.domHandler.addMultipleClasses(this.mask, maskStyleClass);

      if (this.closable && this.dismissableMask) {
        this.maskClickListener = this.renderer.listen(this.mask, 'click', (event: any) => {
          this.close(event);
        });
      }
      document.body.appendChild(this.mask);
      if (this.blockScroll) {
        this.domHandler.addClass(document.body, 'ui-overflow-hidden');
      }
    }
  }

  disableModality() {
    if (this.mask) {
      document.body.removeChild(this.mask);
      if (this.blockScroll) {
        const bodyChildren = document.body.children;
        let hasBlockerMasks: boolean;
        for (let i = 0; i < bodyChildren.length; i++) {
          const bodyChild = bodyChildren[i];
          if (this.domHandler.hasClass(bodyChild, 'ui-dialog-mask-scrollblocker')) {
            hasBlockerMasks = true;
            break;
          }
        }

        if (!hasBlockerMasks) {
          this.domHandler.removeClass(document.body, 'ui-overflow-hidden');
        }
      }
      this.mask = null;
    }
  }

  unbindMaskClickListener() {
    if (this.maskClickListener) {
      this.maskClickListener();
      this.maskClickListener = null;
    }
  }

  moveOnTop() {
    if (this.autoZIndex) {
      this.containerViewChild.nativeElement.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
    }
  }

  onCloseMouseDown(event: Event) {
    this.closeIconMouseDown = true;
  }

  initDrag(event: MouseEvent) {
    if (this.closeIconMouseDown) {
      this.closeIconMouseDown = false;
      return;
    }

    if (this.draggable) {
      this.dragging = true;
      this.lastPageX = event.pageX;
      this.lastPageY = event.pageY;
      this.domHandler.addClass(document.body, 'ui-unselectable-text');
    }
  }

  onDrag(event: MouseEvent) {
    if (this.dragging) {
      const deltaX = event.pageX - this.lastPageX;
      const deltaY = event.pageY - this.lastPageY;
      const leftPos = parseInt(this.containerViewChild.nativeElement.style.left, 10) + deltaX;
      const topPos = parseInt(this.containerViewChild.nativeElement.style.top, 10) + deltaY;

      if (leftPos >= this.minX) {
        this.containerViewChild.nativeElement.style.left = leftPos + 'px';
      }

      if (topPos >= this.minY) {
        this.containerViewChild.nativeElement.style.top = topPos + 'px';
      }

      this.lastPageX = event.pageX;
      this.lastPageY = event.pageY;
    }
  }

  endDrag(event: MouseEvent) {
    if (this.draggable) {
      this.dragging = false;
      this.domHandler.removeClass(document.body, 'ui-unselectable-text');
    }
  }

  initResize(event: MouseEvent) {
    if (this.resizable) {
      this.preWidth = null;
      this.resizing = true;
      this.lastPageX = event.pageX;
      this.lastPageY = event.pageY;
      this.domHandler.addClass(document.body, 'ui-unselectable-text');
    }
  }

  onResize(event: MouseEvent) {
    if (this.resizing) {
      const deltaX = event.pageX - this.lastPageX;
      const deltaY = event.pageY - this.lastPageY;
      const containerWidth = this.domHandler.getOuterWidth(this.containerViewChild.nativeElement);
      const containerHeight = this.domHandler.getOuterHeight(this.containerViewChild.nativeElement);
      const contentHeight = this.domHandler.getOuterHeight(this.contentViewChild.nativeElement);
      const newWidth = containerWidth + deltaX;
      const newHeight = containerHeight + deltaY;

      if (newWidth > this.minWidth) {
        this.containerViewChild.nativeElement.style.width = newWidth + 'px';
      }

      if (newHeight > this.minHeight) {
        this.containerViewChild.nativeElement.style.height = newHeight + 'px';
        this.contentViewChild.nativeElement.style.height = contentHeight + deltaY + 'px';
      }

      this.lastPageX = event.pageX;
      this.lastPageY = event.pageY;
    }
  }

  onResizeEnd(event: MouseEvent) {
    if (this.resizing) {
      this.resizing = false;
      this.domHandler.removeClass(document.body, 'ui-unselectable-text');
    }
  }

  bindGlobalListeners() {
    if (this.draggable) {
      this.bindDocumentDragListener();
      this.bindDocumentDragEndListener();
    }

    if (this.resizable) {
      this.bindDocumentResizeListeners();
    }

    if (this.responsive) {
      this.bindDocumentResponsiveListener();
    }

    if (this.closeOnEscape && this.closable) {
      this.bindDocumentEscapeListener();
    }
  }

  unbindGlobalListeners() {
    this.unbindDocumentDragListener();
    this.unbindDocumentDragEndListener();
    this.unbindDocumentResizeListeners();
    this.unbindDocumentResponsiveListener();
    this.unbindDocumentEscapeListener();
  }

  bindDocumentDragListener() {
    this.zone.runOutsideAngular(() => {
      this.documentDragListener = this.onDrag.bind(this);
      window.document.addEventListener('mousemove', this.documentDragListener);
    });
  }

  unbindDocumentDragListener() {
    if (this.documentDragListener) {
      window.document.removeEventListener('mousemove', this.documentDragListener);
      this.documentDragListener = null;
    }
  }

  bindDocumentDragEndListener() {
    this.zone.runOutsideAngular(() => {
      this.documentDragEndListener = this.endDrag.bind(this);
      window.document.addEventListener('mouseup', this.documentDragEndListener);
    });
  }

  unbindDocumentDragEndListener() {
    if (this.documentDragEndListener) {
      window.document.removeEventListener('mouseup', this.documentDragEndListener);
      this.documentDragEndListener = null;
    }
  }

  bindDocumentResizeListeners() {
    this.zone.runOutsideAngular(() => {
      this.documentResizeListener = this.onResize.bind(this);
      this.documentResizeEndListener = this.onResizeEnd.bind(this);
      window.document.addEventListener('mousemove', this.documentResizeListener);
      window.document.addEventListener('mouseup', this.documentResizeEndListener);
    });
  }

  unbindDocumentResizeListeners() {
    if (this.documentResizeListener && this.documentResizeEndListener) {
      window.document.removeEventListener('mouseup', this.documentResizeListener);
      window.document.removeEventListener('mouseup', this.documentResizeEndListener);
      this.documentResizeListener = null;
      this.documentResizeEndListener = null;
    }
  }

  bindDocumentResponsiveListener() {
    this.zone.runOutsideAngular(() => {
      this.documentResponsiveListener = this.onWindowResize.bind(this);
      window.addEventListener('resize', this.documentResponsiveListener);
    });
  }

  unbindDocumentResponsiveListener() {
    if (this.documentResponsiveListener) {
      window.removeEventListener('resize', this.documentResponsiveListener);
      this.documentResponsiveListener = null;
    }
  }

  onWindowResize(event) {
    const viewport = this.domHandler.getViewport();
    const width = this.domHandler.getOuterWidth(this.containerViewChild.nativeElement);
    if (viewport.width <= this.breakpoint) {
      if (!this.preWidth) {
        this.preWidth = width;
      }
      this.containerViewChild.nativeElement.style.left = '0px';
      this.containerViewChild.nativeElement.style.width = '100%';
    } else {
      this.containerViewChild.nativeElement.style.width = this.preWidth + 'px';
      this.positionOverlay();
    }
  }

  bindDocumentEscapeListener() {
    this.documentEscapeListener = this.renderer.listen('document', 'keydown', (event) => {
      if (event.which === 27) {
        if (parseInt(this.containerViewChild.nativeElement.style.zIndex, 10) === DomHandler.zindex) {
          this.close(event);
        }
      }
    });
  }

  unbindDocumentEscapeListener() {
    if (this.documentEscapeListener) {
      this.documentEscapeListener();
      this.documentEscapeListener = null;
    }
  }

  ngOnDestroy() {
    this.initialized = false;

    this.disableModality();

    this.unbindGlobalListeners();

    if (this.appendTo) {
      this.el.nativeElement.appendChild(this.containerViewChild.nativeElement);
    }

    this.unbindMaskClickListener();
  }
}
