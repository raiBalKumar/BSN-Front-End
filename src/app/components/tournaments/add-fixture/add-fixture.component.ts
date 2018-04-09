import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TournamentService } from '../../../services/tournament.service';

@Component({
  selector: 'app-add-fixture',
  templateUrl: './add-fixture.component.html',
  styleUrls: ['./add-fixture.component.css']
})
export class AddFixtureComponent implements OnInit {
  id: Params;

  constructor(private route: ActivatedRoute,
              private tournamentService: TournamentService) { }

  ngOnInit() {
    // this.route.params.subscribe((params: Params) => {
    //   this.id = params['id'];
    //   this.tournamentService.getTeamInfo(this.id);
    // })

  }

}
