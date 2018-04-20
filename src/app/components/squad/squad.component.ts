import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TeamService } from '../../services/team.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-squad',
  templateUrl: './squad.component.html',
  styleUrls: ['./squad.component.css']
})
export class SquadComponent implements OnInit {
  private squad$: Observable<Models.TeamSquad[]>

  constructor(private teamService: TeamService, private modalService: NgbModal) { }

  ngOnInit() {
    this.squad$ = this.teamService.getSquad();
  }

  open(content) {
    this.modalService.open(content, { centered: true, size: 'sm' });
  }
}
