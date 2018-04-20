import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFixtureComponent } from './list-fixture.component';

describe('ListFixtureComponent', () => {
  let component: ListFixtureComponent;
  let fixture: ComponentFixture<ListFixtureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFixtureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFixtureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
