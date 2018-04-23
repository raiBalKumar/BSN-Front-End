import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { Observable } from 'rxjs/Observable';
import { TeamService } from '../../services/team.service';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  private fixture = <Models.TeamFixtures>{};
  private events$: Observable<CalendarEvent[]>;
  private datePipe = new DatePipe('en');

  // calendar attritbutes
  viewDate: Date = new Date(); // today
  view: string = 'month'; // specify the month view
  color: EventColor = {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  };
  events: CalendarEvent[] = [];
  @Output() viewChange: EventEmitter<string> = new EventEmitter();
  @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();

  constructor(private teamService: TeamService, private modalService: NgbModal) { }

  ngOnInit() {
    this.events$ = this.teamService.getFixtures().pipe(
      map(fixtures => fixtures.map(
        fixture => <CalendarEvent>{
          title: `${fixture.opponent_teamname} at ${this.datePipe.transform(new Date(fixture.date), 'shortTime')}`,
          color: this.color,
          start: new Date(fixture.date),
          meta: fixture
        })
      )
    );
  }

  eventClicked(event): void {
    this.fixture = event.meta;
  }

  open(content) {
    this.modalService.open(content);
  }
}
