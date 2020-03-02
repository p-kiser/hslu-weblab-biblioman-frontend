import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopshelfComponent } from './topshelf.component';

describe('TopshelfComponent', () => {
  let component: TopshelfComponent;
  let fixture: ComponentFixture<TopshelfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopshelfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopshelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
