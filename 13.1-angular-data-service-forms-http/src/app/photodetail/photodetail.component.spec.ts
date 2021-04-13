import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotodetailComponent } from './photodetail.component';

describe('PhotodetailComponent', () => {
  let component: PhotodetailComponent;
  let fixture: ComponentFixture<PhotodetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotodetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotodetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
