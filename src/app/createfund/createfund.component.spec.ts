import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatefundComponent } from './createfund.component';

describe('CreatefundComponent', () => {
  let component: CreatefundComponent;
  let fixture: ComponentFixture<CreatefundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatefundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
