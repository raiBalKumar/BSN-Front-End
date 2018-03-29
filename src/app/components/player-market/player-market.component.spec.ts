import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerMarketComponent } from './player-market.component';

describe('PlayerMarketComponent', () => {
  let component: PlayerMarketComponent;
  let fixture: ComponentFixture<PlayerMarketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerMarketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerMarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
