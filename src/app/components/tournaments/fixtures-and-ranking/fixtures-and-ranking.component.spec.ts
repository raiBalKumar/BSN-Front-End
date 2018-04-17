import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixturesAndRankingComponent } from './fixtures-and-ranking.component';

describe('FixturesAndRankingComponent', () => {
  let component: FixturesAndRankingComponent;
  let fixture: ComponentFixture<FixturesAndRankingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixturesAndRankingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixturesAndRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
