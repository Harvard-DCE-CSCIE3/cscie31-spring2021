import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewphotoComponent } from './newphoto.component';

describe('NewphotoComponent', () => {
  let component: NewphotoComponent;
  let fixture: ComponentFixture<NewphotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewphotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewphotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
