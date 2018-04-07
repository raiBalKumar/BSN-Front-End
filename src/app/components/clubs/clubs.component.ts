import { Component, OnInit} from '@angular/core';
import { TeamService } from '../../services/team.service';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.css'],
})
export class ClubsComponent implements OnInit {
  private image: string;
  private teamInfo$: Observable<Models.TeamInformation> // Team Info
  private upComingMatch$: Observable<Models.TeamFixtures>

  constructor(private teamService: TeamService, private userService: UserService) { }

  ngOnInit() {
    this.teamService.reloadTeam();
    this.teamInfo$ = this.teamService.getTeamInformation();
    this.upComingMatch$ = this.teamService.getUpcomingMatch();
  }
}
