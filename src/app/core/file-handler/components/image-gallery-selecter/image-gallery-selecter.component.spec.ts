import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageGallerySelecterComponent } from './image-gallery-selecter.component';

describe('ImageGallerySelecterComponent', () => {
  let component: ImageGallerySelecterComponent;
  let fixture: ComponentFixture<ImageGallerySelecterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageGallerySelecterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageGallerySelecterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
